import { LocalStrategyBase } from '@gurban/kit/nest/passport-strategies/local-strategy-base';
import { Injectable } from '@nestjs/common';

import { AuthService, CurrentUserJwtPayload, UserWithPassword } from '../auth.service';

@Injectable()
export class LocalStrategy extends LocalStrategyBase<UserWithPassword, CurrentUserJwtPayload> {
  constructor(private authService: AuthService) {
    super();
  }

  getAuthService() {
    return this.authService;
  }
}
