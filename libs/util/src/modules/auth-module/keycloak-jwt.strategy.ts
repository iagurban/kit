import {
  KeycloakJwtConfig,
  keycloakJwtConfigToken,
  OidcJwtStrategyBase,
} from '@gurban/kit/nest/oidc-jwt-strategy.base';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

import { AuthService } from './auth.service';
import { AppUser, KeycloakPayload } from './auth.types';

@Injectable()
export class KeycloakJwtStrategy extends OidcJwtStrategyBase<AppUser, KeycloakPayload> {
  constructor(
    @Inject(keycloakJwtConfigToken) config: KeycloakJwtConfig,
    private readonly authService: AuthService
  ) {
    super(config);
  }

  override authenticate(req: Request): void {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (process.env.NODE_ENV !== 'production' && token?.startsWith('x-dev-user-')) {
      // This is our special dev token. We can use the AuthService to "validate" it.
      this.authService
        .validateToken(token)
        .then(user => this.success(user))
        .catch(err => this.fail(err)); // Let passport handle the error
    } else {
      // This is a real JWT. Let the base strategy handle it.
      super.authenticate(req);
    }
  }

  async convertPayloadToUser(payload: KeycloakPayload): Promise<AppUser> {
    return this.authService.convertPayloadToUser(payload);
  }
}
