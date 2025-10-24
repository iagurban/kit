import { ServerTimestampPreciseInterceptor } from '@gurban/kit/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

@Controller('api')
export class AppController {
  constructor() {}

  @Get(`time`)
  @UseInterceptors(ServerTimestampPreciseInterceptor)
  time() {}
}
