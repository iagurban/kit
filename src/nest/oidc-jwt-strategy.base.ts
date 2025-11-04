import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type KeycloakJwtConfig = {
  issuer: string;
  audience: string;
  jwksUri?: string;
};

export const keycloakJwtConfigToken: unique symbol = Symbol('keycloakJwtConfigToken');

/**
 * Abstract base class for a Passport JWT strategy that validates tokens from an
 * OIDC-compliant third-party identity provider (e.g., Keycloak, Auth0).
 *
 * It automates the process of fetching the public signing key from the provider's
 * JWKS (JSON Web Key Set) endpoint.
 *
 * @template TUser - The application-specific user object type.
 * @template TPayload - The expected type of the JWT payload from the IdP.
 */
@Injectable()
export abstract class OidcJwtStrategyBase<
  TUser extends { id: string },
  TPayload extends { sub: string },
> extends PassportStrategy(Strategy, 'jwt') {
  static readonly defaultJwksUri = (issuer: string) => `${issuer}/protocol/openid-connect/certs`;

  /**
   * Converts the validated JWT payload from the IdP into your application's
   * internal user representation. This is where you map claims to user properties.
   *
   * @param payload The validated JWT payload.
   * @returns A promise that resolves to the application user object.
   */
  abstract convertPayloadToUser(payload: TPayload): Promise<TUser>;

  protected constructor(protected readonly config: KeycloakJwtConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.jwksUri ?? OidcJwtStrategyBase.defaultJwksUri(config.issuer),
      }),
      ignoreExpiration: false,
      audience: config.audience,
      issuer: config.issuer,
    });
  }

  /**
   * Passport's validation method. It receives the payload after the signature
   * and claims (`iss`, `aud`, `exp`) have been verified.
   *
   * This method delegates the payload-to-user conversion to the abstract
   * `convertPayloadToUser` method.
   */
  override async validate(payload: TPayload): Promise<TUser> {
    return this.convertPayloadToUser(payload);
  }
}
