import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from './logger/logger.module';

export const rootImports = [
  ConfigModule.forRoot({
    isGlobal: true,
    // Указываем, чтобы он искал .env файлы в зависимости от окружения
    // envFilePath: `.env.${process.env.NODE_ENV}`,
  }),
  LoggerModule,
];
