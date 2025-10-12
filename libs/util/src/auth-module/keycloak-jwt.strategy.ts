import {
  KeycloakJwtConfig,
  keycloakJwtConfigToken,
  OidcJwtStrategyBase,
} from '@gurban/kit/nest/oidc-jwt-strategy.base';
import { Inject, Injectable } from '@nestjs/common';

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

  async convertPayloadToUser(payload: KeycloakPayload): Promise<AppUser> {
    return this.authService.convertPayloadToUser(payload);
  }
}
