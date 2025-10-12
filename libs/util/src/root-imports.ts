import { ConfigModule } from '@nestjs/config';

import { ClientNameModule } from './client-name/client-name.module';
import { LoggerModule } from './logger/logger.module';

export const rootImports = [
  ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
  }),
  ClientNameModule,
  LoggerModule,
];
