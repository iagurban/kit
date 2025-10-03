import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from './logger/logger.module';

export const rootImports = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  LoggerModule,
];
