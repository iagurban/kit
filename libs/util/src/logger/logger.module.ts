import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FastifyRequest } from 'fastify';
import { InjectPinoLogger, LoggerModule as PinoLoggerModule, PinoLogger } from 'nestjs-pino';

// private
@Module({})
class SharedLoggerModule {}

export const LoggerModule: DynamicModule = {
  global: true,
  module: SharedLoggerModule,
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService],
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
  exports: [PinoLoggerModule],
};

export const InjectLogger = InjectPinoLogger;
export class Logger extends PinoLogger {}
