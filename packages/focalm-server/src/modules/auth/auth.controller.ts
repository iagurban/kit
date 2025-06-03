import { Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService, refreshTokenCookieOptions } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const oldRefreshToken = req.cookies['refresh_token'];

    if (!oldRefreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    const { accessToken, refreshToken } = await this.authService.refresh(oldRefreshToken);

    res.cookie('refresh_token', refreshToken, refreshTokenCookieOptions);

    return res.json({ access_token: accessToken });
  }
}
