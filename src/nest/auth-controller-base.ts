import { UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthServiceBase } from './auth-service-base';

export class AuthControllerBase<
  User extends { id: string; passwordHash: string },
  CurrentUserJwtPayload extends { sub: string },
> {
  constructor(private authService: AuthServiceBase<User, CurrentUserJwtPayload>) {}

  async refresh(req: Request, res: Response) {
    const oldRefreshToken = req.cookies['refresh_token'];

    if (!oldRefreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    const { accessToken, refreshToken } = await this.authService.refresh(oldRefreshToken);

    res.cookie('refresh_token', refreshToken, this.authService.refreshTokenCookieOptions);

    return res.json({ access_token: accessToken });
  }

  async login(login: string, password: string, res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(login, password);

    res.cookie('refresh_token', refreshToken, this.authService.refreshTokenCookieOptions);

    return accessToken;
  }

  async logout(req: Request, res: Response) {
    const oldRefresh = req.cookies['refresh_token'];
    if (oldRefresh) {
      await this.authService.refresh(oldRefresh);
    } // она удалит токен
    res.clearCookie('refresh_token');
    return true;
  }
}
