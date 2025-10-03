import { AuthControllerBase } from '@gurban/kit/nest/auth-controller-base';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService, CurrentUserJwtPayload, UserWithPassword } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.base = new AuthControllerBase<UserWithPassword, CurrentUserJwtPayload>(authService);
  }

  readonly base: AuthControllerBase<UserWithPassword, CurrentUserJwtPayload>;

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    return this.base.refresh(req, res);
  }
}
