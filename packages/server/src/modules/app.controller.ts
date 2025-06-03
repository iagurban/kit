import { Controller, Request } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    readonly authService: AuthService
  ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req: { user: Omit<User, `passwordHash`> }) {
  //   return this.authService.login(req.user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: { user: Omit<User, `passwordHash`> }) {
  //   return req.user;
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/logout')
  // async logout(@Request() req: { logout: () => void }) {
  //   return req.logout();
  // }
}
