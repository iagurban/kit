import { Request, Response } from 'express';

export interface OidcTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

/**
 * Abstract base class for a controller that manages the OIDC Authorization Code Flow.
 * It provides endpoints to initiate login and logout by redirecting the user
 * to the third-party identity provider.
 *
 * This is primarily intended for server-side applications. For SPAs, the
 * frontend typically handles this flow.
 */
export abstract class OidcAuthControllerBase {
  /**
   * Constructs the full authorization URL to which the user should be redirected
   * to start the login process.
   *
   * @returns The complete URL for the IdP's authorization endpoint with necessary query parameters.
   */
  protected abstract getAuthorizationUrl(): string;

  /**
   * Constructs the full logout URL to which the user should be redirected
   * to end their session on the identity provider.
   *
   * @param req The incoming Express request, useful for accessing cookies or headers
   * that might contain an `id_token_hint`.
   * @returns The complete URL for the IdP's end-session endpoint.
   */
  protected abstract getLogoutUrl(req: Request): string;

  /**
   * Endpoint to initiate the login flow.
   * It calls the abstract `getAuthorizationUrl` method and redirects the user.
   */
  public login(res: Response): void {
    const url = this.getAuthorizationUrl();
    res.redirect(302, url);
  }

  /**
   * Endpoint to initiate the logout flow.
   * It calls the abstract `getLogoutUrl` method and redirects the user.
   */
  public logout(req: Request, res: Response): void {
    const url = this.getLogoutUrl(req);
    res.redirect(302, url);
  }

  /**
   * Exchanges an authorization code for OIDC tokens.
   * This method contains the provider-specific logic for the token endpoint.
   * @param code The authorization code from the callback URL.
   * @returns A promise that resolves to the OIDC tokens.
   */
  public abstract exchangeCodeForTokens(code: string): Promise<OidcTokens>;

  /**
   * Establishes a session by setting tokens in secure cookies and redirecting.
   * @param res The Express Response object.
   * @param tokens The tokens to set in cookies.
   * @param redirectUrl The URL to redirect the user to after a successful login.
   */
  public handleSuccessfulLogin(res: Response, tokens: OidcTokens, redirectUrl: string): void {
    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokens.expiresIn * 1000,
      sameSite: 'lax',
      path: '/',
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokens.refreshExpiresIn * 1000,
      sameSite: 'lax',
      path: '/',
    });
    res.redirect(302, redirectUrl);
  }
}
