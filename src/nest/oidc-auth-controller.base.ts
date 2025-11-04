export interface OidcTokens {
  accessToken: string;
  expiresIn: number;
  refreshToken?: string;
  refreshExpiresIn?: number;
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
   * @param req The incoming Fastify request, useful for accessing cookies or headers
   * that might contain an `id_token_hint`.
   * @returns The complete URL for the IdP's end-session endpoint.
   */
  protected abstract getLogoutUrl(): string;

  /**
   * Endpoint to initiate the login flow.
   * It calls the abstract `getAuthorizationUrl` method and redirects the user.
   */
  // public login(res: FastifyReply): FastifyReply {
  //   const url = this.getAuthorizationUrl();
  //   console.log(url);
  //   return res.redirect(url);
  // }

  /**
   * Endpoint to initiate the logout flow.
   * It calls the abstract `getLogoutUrl` method and redirects the user.
   */
  // public logout(req: FastifyRequest, res: FastifyReply): FastifyReply {
  //   const url = this.getLogoutUrl(req);
  //   return res.redirect(url);
  // }

  /**
   * Exchanges an authorization code for OIDC tokens.
   * This method contains the provider-specific logic for the token endpoint.
   * @param code The authorization code from the callback URL.
   * @returns A promise that resolves to the OIDC tokens.
   */
  public abstract exchangeCodeForTokens(code: string): Promise<OidcTokens>;
}
