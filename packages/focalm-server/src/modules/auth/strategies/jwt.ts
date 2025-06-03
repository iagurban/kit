import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { CurrentUser } from '../../../decorators/current-user';
import { CurrentUserJwtPayload, jwtConstants } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: CurrentUserJwtPayload): Promise<CurrentUser> {
    return { id: payload.sub, name: payload.name, email: payload.email };
  }
}
