import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FastifyRequest } from 'fastify';
import { LoggerModule as PinoLoggerModule, PinoLogger } from 'nestjs-pino';
import { BaseLogger as PinoBaseLogger } from 'pino';

import { ExtendedJsonObject } from '../json-type';

export type BaseLogger = PinoBaseLogger;

export class Logger extends PinoLogger {}

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService],
      providers: [Logger],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        return {
          pinoHttp: isProduction
            ? {
                level: 'info',
                serializers: {
                  req: (req: FastifyRequest) => ({
                    id: req.id,
                    method: req.method,
                    url: req.url,
                  }),
                },
                autoLogging: false,
              }
            : {
                level: 'debug',
                transport: {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                    colorize: true,
                    levelFirst: true,
                    translateTime: 'SYS:HH:MM:ss.l',
                  },
                },
              },
        };
      },
    }),
  ],

  providers: [Logger],
  // We must export `Logger` so other modules can import this module and inject `Logger`.
  exports: [Logger, PinoLoggerModule],
})
export class LoggerModule {}

export const createContextualLogger = (
  logger: Logger,
  name: string,
  payload?: ExtendedJsonObject
): BaseLogger => logger.logger.child({ ...payload, context: name });
