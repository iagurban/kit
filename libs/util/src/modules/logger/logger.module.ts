import { ILogger } from '@gurban/kit/interfaces/logger-interface';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import pino from 'pino';

export class Logger implements ILogger {
  level!: pino.LevelWithSilentOrString;
  fatal!: pino.LogFn;
  error!: pino.LogFn;
  warn!: pino.LogFn;
  info!: pino.LogFn;
  debug!: pino.LogFn;
  trace!: pino.LogFn;
  silent!: pino.LogFn;
  child!: <ChildCustomLevels extends string = never>(
    bindings: pino.Bindings,
    options?: pino.ChildLoggerOptions<ChildCustomLevels> | undefined
  ) => pino.Logger<ChildCustomLevels>;
}

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      // We are creating a provider for our custom `Logger` class
      provide: Logger,
      inject: [ConfigService],
      // This factory builds a pure, singleton pino instance
      useFactory: (config: ConfigService): ILogger => {
        const isProduction = config.get<string>('NODE_ENV') === 'production';
        const level = config.get<string>(`LOG_LEVEL`);
        const pinoOptions = isProduction
          ? {
              level: level || `info`,
            }
          : {
              level: level || `debug`,
              transport: {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  colorize: true,
                  levelFirst: true,
                  translateTime: 'SYS:HH:MM:ss.l',
                },
              },
              serializers: {
                error: pino.stdSerializers.err,
              },
            };

        // 1. Create a raw pino instance. It has no knowledge of NestJS requests.
        return pino(pinoOptions);
      },
    },
  ],
  // We export only our custom `Logger`
  exports: [Logger],
})
export class LoggerModule {}
