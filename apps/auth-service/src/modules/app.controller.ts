import { ServerTimestampPreciseInterceptor } from '@gurban/kit/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { AuthService } from './auth/auth.service';

@Controller('api')
export class AppController {
  constructor(readonly authService: AuthService) {}

  @Get(`time`)
  @UseInterceptors(ServerTimestampPreciseInterceptor)
  time() {}
}
