import { OidcAuthControllerBase, OidcTokens } from '@gurban/kit/nest/oidc-auth-controller.base';
import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isAxiosError } from 'axios';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

class KeycloakAuthControllerImpl extends OidcAuthControllerBase {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    super();
  }

  protected getAuthorizationUrl(): string {
    const authServerUrl = this.configService.getOrThrow<string>('KEYCLOAK_ISSUER_URL');
    const clientId = this.configService.getOrThrow<string>('KEYCLOAK_CLIENT_ID');
    const redirectUri = this.configService.getOrThrow<string>('KEYCLOAK_REDIRECT_URI');

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri, // Where Keycloak sends the user back after login
      response_type: 'code',
      scope: 'openid profile email', // Standard OIDC scopes
    });

    return `${authServerUrl}/protocol/openid-connect/auth?${params.toString()}`;
  }

  protected getLogoutUrl(req: Request): string {
    const authServerUrl = this.configService.getOrThrow<string>('KEYCLOAK_ISSUER_URL');
    const postLogoutRedirectUri = this.configService.getOrThrow<string>('APP_HOME_URL');

    const params = new URLSearchParams({
      // For Keycloak, you often don't need client_id or id_token_hint for a simple redirect logout,
      // but you MUST configure the valid redirect URI in the Keycloak client settings.
      post_logout_redirect_uri: postLogoutRedirectUri,
    });

    return `${authServerUrl}/protocol/openid-connect/logout?${params.toString()}`;
  }

  public async exchangeCodeForTokens(code: string): Promise<OidcTokens> {
    const issuerUrl = this.configService.getOrThrow<string>('KEYCLOAK_ISSUER_URL');
    const clientId = this.configService.getOrThrow<string>('KEYCLOAK_CLIENT_ID');
    const clientSecret = this.configService.getOrThrow<string>('KEYCLOAK_CLIENT_SECRET');
    const redirectUri = this.configService.getOrThrow<string>('KEYCLOAK_REDIRECT_URI');

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const tokenResponse = await firstValueFrom(
      this.httpService.post(`${issuerUrl}/protocol/openid-connect/token`, params)
    );

    const data = tokenResponse.data;
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      refreshExpiresIn: data.refresh_expires_in,
    };
  }
}

// This is the actual NestJS controller that exposes the routes.
@Controller('auth')
export class KeycloakAuthController {
  private readonly oidcController: OidcAuthControllerBase;

  constructor(
    private readonly configService: ConfigService,
    httpService: HttpService
  ) {
    this.oidcController = new KeycloakAuthControllerImpl(configService, httpService);
  }

  @Get('login')
  login(@Res() res: Response) {
    return this.oidcController.login(res);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.oidcController.logout(req, res);
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Res({ passthrough: true }) res: Response) {
    if (!code) {
      return res.status(400).send('Missing authorization code');
    }

    try {
      const tokens = await this.oidcController.exchangeCodeForTokens(code);
      const frontendUrl = this.configService.getOrThrow<string>('APP_FRONTEND_URL');

      return this.oidcController.handleSuccessfulLogin(res, tokens, frontendUrl);
    } catch (error) {
      let errorMessage = 'An unknown error occurred during authentication.';

      if (isAxiosError(error)) {
        // Now TypeScript knows `error` is an AxiosError
        // We can safely access its properties
        const errorData = error.response?.data;
        console.error('Keycloak token exchange failed:', errorData || error.message);
        if (errorData && errorData.error_description) {
          errorMessage = `Authentication failed: ${errorData.error_description}`;
        } else {
          errorMessage = `Authentication failed with status: ${error.response?.status}`;
        }
      } else if (error instanceof Error) {
        // Handle generic JavaScript errors
        console.error('An unexpected error occurred:', error.message);
        errorMessage = error.message;
      } else {
        // Handle cases where something other than an Error object was thrown
        console.error('An unusual error was thrown:', error);
      }

      return res.status(500).send(errorMessage);
    }
  }
}
