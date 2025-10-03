import { JwtStrategyBase } from '@gurban/kit/nest/passport-strategies/jwt-strategy-base';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CurrentUser } from '../../../decorators/current-user';
import { CurrentUserJwtPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends JwtStrategyBase<CurrentUser, CurrentUserJwtPayload> {
  constructor(readonly configService: ConfigService) {
    super(configService.getOrThrow<string>(`cookieSecret`));
  }

  async convert(payload: CurrentUserJwtPayload): Promise<CurrentUser> {
    return { id: payload.sub, name: payload.name, email: payload.email };
  }
}
