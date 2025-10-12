import { KeycloakJwtConfig, keycloakJwtConfigToken } from '@gurban/kit/nest/oidc-jwt-strategy.base';
import { Inject, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';

import { AppUser, KeycloakPayload } from './auth.types';

@Injectable()
export class AuthService {
  private jwksClient: JwksClient;

  constructor(@Inject(keycloakJwtConfigToken) private readonly config: KeycloakJwtConfig) {
    this.jwksClient = new JwksClient({
      jwksUri: this.config.jwksUri ?? `${this.config.issuer}/protocol/openid-connect/certs`,
      cache: true,
      rateLimit: true,
    });
  }

  /**
   * Manually validates a JWT access token.
   * This is the function you will call from onConnect.
   * @param token The raw JWT string.
   * @returns A promise that resolves to the AppUser if the token is valid.
   * @throws An error if the token is invalid.
   */
  public async validateToken(token: string): Promise<AppUser> {
    const decodedToken = await new Promise<KeycloakPayload>((resolve, reject) => {
      verify(
        token,
        (header, callback) => {
          this.jwksClient.getSigningKey(header.kid, (err, key) => {
            callback(err, key?.getPublicKey());
          });
        },
        {
          audience: this.config.audience,
          issuer: this.config.issuer,
          algorithms: ['RS256'],
        },
        (err, decoded) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded as KeycloakPayload);
        }
      );
    });

    return this.convertPayloadToUser(decodedToken);
  }

  /**
   * The single source of truth for converting a Keycloak payload to your AppUser.
   */
  public convertPayloadToUser(payload: KeycloakPayload): AppUser {
    return {
      id: payload.sub,
      email: payload.email,
      username: payload.preferred_username,
      roles: payload.realm_access?.roles ?? [],
    };
  }
}
