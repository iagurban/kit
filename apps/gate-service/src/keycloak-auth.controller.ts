import { once } from '@gurban/kit/core/once';
import { createContextualLogger, IBaseLogger } from '@gurban/kit/interfaces/logger-interface';
import { OidcAuthControllerBase } from '@gurban/kit/nest/oidc-auth-controller.base';
import { sleep } from '@gurban/kit/utils/async-utils';
import { retrying } from '@gurban/kit/utils/flow/retrying';
import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query, Redirect, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KeycloakPayload } from '@poslah/util/modules/auth-module/auth.types';
import { DbService } from '@poslah/util/modules/db-module/db.service';
import { Logger } from '@poslah/util/modules/logger/logger.module';
import { isAxiosError } from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { firstValueFrom } from 'rxjs';
import { z } from 'zod/v4';

const tokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.uint32(),
  refresh_token: z.string().optional(),
  refresh_expires_in: z.uint32().optional(),
  id_token: z.string().optional(),
});

class KeycloakAuthControllerImpl extends OidcAuthControllerBase {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly logger: IBaseLogger
  ) {
    super();
  }

  public getLoginUrl(): string {
    return this.getAuthorizationUrl();
  }

  private createAuthorizationUrl(endpoint: `auth` | `logout`, params: URLSearchParams) {
    const issuerUrl = this.configService.getOrThrow<string>('KEYCLOAK_ISSUER_URL');
    return `${issuerUrl}/protocol/openid-connect/${endpoint}?${params.toString()}`;
  }

  protected getAuthorizationUrl(): string {
    const clientId = this.configService.getOrThrow<string>('KEYCLOAK_CLIENT_ID');
    const redirectUri = this.configService.getOrThrow<string>('KEYCLOAK_REDIRECT_URI');

    return this.createAuthorizationUrl(
      `auth`,
      new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri, // Where Keycloak sends the user back after login
        response_type: 'code',
        scope: 'openid profile email', // Standard OIDC scopes
      })
    );
  }

  getLogoutUrl(idTokenHint?: string): string {
    const postLogoutRedirectUri = `${this.configService.getOrThrow<string>('APP_FRONTEND_URL')}/`;

    const params = new URLSearchParams({
      post_logout_redirect_uri: postLogoutRedirectUri,
    });

    if (idTokenHint) {
      params.append('id_token_hint', idTokenHint);
    }

    return this.createAuthorizationUrl(`logout`, params);
  }

  private async callTokenEndpoint(params: URLSearchParams, timeLimitMs: number) {
    const issuerUrl = this.configService.getOrThrow<string>('KEYCLOAK_ISSUER_URL');

    const start = +new Date();
    return retrying(
      async (error, attempt) => {
        if (+new Date() - start > timeLimitMs) {
          this.logger.warn(
            { error, context: { grantType: params.get('grant_type') } },
            'retrying time limit exceeded'
          );
          return false;
        }

        // We want to retry only on network errors or temporary server errors.
        if (isAxiosError(error)) {
          // error.response is undefined for network errors.
          // 5xx status codes indicate server-side errors.
          if (!error.response || (error.response.status >= 500 && error.response.status <= 599)) {
            const delay = Math.min(attempt, 3) * 1000;
            this.logger.warn(
              { error, context: { grantType: params.get('grant_type'), attempt } },
              `retrying after ${delay}ms`
            );
            await sleep(delay);
            return true;
          }
        }

        // For other errors (e.g., 4xx client errors, Zod validation errors), we don't retry.
        return false;
      },
      async () => {
        console.log(params);
        this.logger.warn({ params }, `Calling token endpoint`);
        const tokenResponse = await firstValueFrom(
          this.httpService.post(`${issuerUrl}/protocol/openid-connect/token`, params)
        );

        const data = tokenResponseSchema.parse(tokenResponse.data);
        return {
          accessToken: data.access_token,
          expiresIn: data.expires_in,
          refreshToken: data.refresh_token,
          refreshExpiresIn: data.refresh_expires_in,
          idToken: data.id_token,
        };
      }
    );
  }

  async exchangeRefreshTokenForNewTokens(refreshToken: string) {
    const clientId = this.configService.getOrThrow<string>('KEYCLOAK_CLIENT_ID'); // ID бэкенд-клиента
    const clientSecret = this.configService.getOrThrow<string>('KEYCLOAK_CLIENT_SECRET'); // Секрет бэкенд-клиента

    return this.callTokenEndpoint(
      new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      }),
      30000 // 30 seconds for refresh-token
    );
  }

  public async exchangeCodeForTokens(code: string) {
    const clientId = this.configService.getOrThrow<string>('KEYCLOAK_CLIENT_ID');
    const clientSecret = this.configService.getOrThrow<string>('KEYCLOAK_CLIENT_SECRET');
    const redirectUri = this.configService.getOrThrow<string>('KEYCLOAK_REDIRECT_URI');

    return this.callTokenEndpoint(
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      15000 // 15 seconds for authorization code
    );
  }
}

@Controller('auth')
export class KeycloakAuthController {
  private readonly oidcController: KeycloakAuthControllerImpl;

  constructor(
    private readonly configService: ConfigService,
    httpService: HttpService,
    private readonly loggerBase: Logger,
    private readonly db: DbService
  ) {
    this.oidcController = new KeycloakAuthControllerImpl(configService, httpService, this.logger);
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, KeycloakAuthController.name);
  }

  @Get('login')
  @Redirect()
  login() {
    return {
      url: this.oidcController.getLoginUrl(),
      statusCode: 302, // 302 is the standard code for a temporary redirect
    };
  }

  @Get('logout')
  @Redirect()
  logout(@Req() req: FastifyRequest) {
    const idToken = req.cookies['id_token'];
    return {
      url: this.oidcController.getLogoutUrl(idToken),
      statusCode: 302,
    };
  }

  private setRefreshToken(res: FastifyReply, refreshToken: string, refreshExpiresIn: number) {
    // Set a refresh token to cookies to make the client able to request refresh
    res.setCookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: refreshExpiresIn * 1000,
      sameSite: 'lax',
      path: '/',
    });
  }

  private setIdToken(res: FastifyReply, idToken: string, expiresIn: number) {
    res.setCookie('id_token', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn * 1000,
      sameSite: 'lax',
      path: '/',
    });
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Res() res: FastifyReply): Promise<FastifyReply> {
    if (!code) {
      return res.status(400).send('Missing authorization code');
    }

    try {
      const tokens = await this.oidcController.exchangeCodeForTokens(code);

      const [, payloadB64] = tokens.accessToken.split('.');
      const data = JSON.parse(Buffer.from(payloadB64, 'base64').toString()) as KeycloakPayload;
      this.logger.info({ data }, 'User identity extracted from token, now upserting user in local database');
      await this.db.transaction.user.upsert({
        where: { id: data.sub },
        create: { id: data.sub, email: data.email, name: data.preferred_username },
        update: { email: data.email, name: data.preferred_username },
      });

      const frontendUrl = `${this.configService.getOrThrow<string>('APP_FRONTEND_URL')}/`;
      if (!tokens.refreshToken || !tokens.refreshExpiresIn) {
        this.logger.error({ tokens }, 'Can not establish session: refresh token or expiration is missing.');
        return res.status(500).send('Can not establish session.');
      }

      this.setRefreshToken(res, tokens.refreshToken, tokens.refreshExpiresIn);
      if (tokens.idToken) {
        this.setIdToken(res, tokens.idToken, tokens.expiresIn);
      }
      return res.redirect(frontendUrl, 302);
    } catch (error) {
      /// TODO include real error messages only in the dev-mode

      let errorMessage = 'An unknown error occurred during authentication.';

      if (isAxiosError(error)) {
        // Now TypeScript knows `error` is an AxiosError
        // We can safely access its properties
        const errorData = error.response?.data;
        this.logger.error({ error: errorData || error.message }, 'Keycloak token exchange failed');
        if (errorData && errorData.error_description) {
          errorMessage = `Authentication failed: ${errorData.error_description}`;
        } else {
          errorMessage = `Authentication failed with status: ${error.response?.status}`;
        }
      } else if (error instanceof Error) {
        // Handle generic JavaScript errors
        this.logger.error({ error }, 'An unexpected error occurred');
        errorMessage = error.message;
      } else {
        // Handle cases where something other than an Error object was thrown
        this.logger.error({ error }, 'An unusual error was thrown');
      }

      return res.status(500).send(errorMessage);
    }
  }

  @Get('refresh')
  async refreshTokens(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<{ accessToken: string; expiresIn: number }> {
    this.logger.warn(`11`);
    const oldRefreshToken = req.cookies['refresh_token'];
    if (!oldRefreshToken) {
      // means "do not retry unless re-login"
      throw new UnauthorizedException('No refresh token found in cookies.');
    }

    try {
      const tokens = await this.oidcController.exchangeRefreshTokenForNewTokens(oldRefreshToken);

      if (tokens.refreshToken && tokens.refreshExpiresIn) {
        this.setRefreshToken(res, tokens.refreshToken, tokens.refreshExpiresIn);
      }

      if (tokens.idToken) {
        this.setIdToken(res, tokens.idToken, tokens.expiresIn);
      }

      return {
        accessToken: tokens.accessToken,
        expiresIn: tokens.expiresIn,
      };
    } catch (error) {
      this.logger.error({ error }, 'Failed to refresh token in Keycloak');
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
