import { EventEmitter } from 'node:events';

import { ILogger } from '@gurban/kit/interfaces/logger-interface';
import { AnyFunction } from '@gurban/kit/utils/types';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import pino, { BaseLogger as PinoBaseLogger } from 'pino';

export class Logger implements pino.Logger<never, boolean> {
  level!: pino.LevelWithSilentOrString;
  fatal!: pino.LogFn;
  error!: pino.LogFn;
  warn!: pino.LogFn;
  info!: pino.LogFn;
  debug!: pino.LogFn;
  trace!: pino.LogFn;
  silent!: pino.LogFn;
  get msgPrefix(): string | undefined {
    throw new Error('Method not implemented.');
  }
  version!: string;
  levels!: pino.LevelMapping;
  useLevelLabels!: boolean;
  levelVal!: number;
  child<ChildCustomLevels extends string = never>(
    bindings: pino.Bindings,
    options?: pino.ChildLoggerOptions<ChildCustomLevels> | undefined
  ): pino.Logger<ChildCustomLevels, boolean> {
    throw new Error('Method not implemented.');
  }
  onChild!: pino.OnChildCallback<never>;
  on(event: 'level-change', listener: pino.LevelChangeEventListener<never, boolean>): this {
    throw new Error('Method not implemented.');
  }
  addListener(event: 'level-change', listener: pino.LevelChangeEventListener<never, boolean>): this {
    throw new Error('Method not implemented.');
  }
  once(event: 'level-change', listener: pino.LevelChangeEventListener<never, boolean>): this {
    throw new Error('Method not implemented.');
  }
  prependListener(event: 'level-change', listener: pino.LevelChangeEventListener<never, boolean>): this {
    throw new Error('Method not implemented.');
  }
  prependOnceListener(event: 'level-change', listener: pino.LevelChangeEventListener<never, boolean>): this {
    throw new Error('Method not implemented.');
  }
  removeListener(event: 'level-change', listener: pino.LevelChangeEventListener<never, boolean>): this {
    throw new Error('Method not implemented.');
  }
  isLevelEnabled(level: pino.LevelWithSilentOrString): boolean {
    throw new Error('Method not implemented.');
  }
  bindings(): pino.Bindings {
    throw new Error('Method not implemented.');
  }
  setBindings(bindings: pino.Bindings): void {
    throw new Error('Method not implemented.');
  }
  flush(cb?: (err?: Error) => void): void {
    throw new Error('Method not implemented.');
  }
  [EventEmitter.captureRejectionSymbol]?<K>(error: Error, event: string | symbol, ...args: any[]): void {
    throw new Error('Method not implemented.');
  }
  off<K>(eventName: string | symbol, listener: (...args: any[]) => void): this {
    throw new Error('Method not implemented.');
  }
  removeAllListeners(eventName?: string | symbol | undefined): this {
    throw new Error('Method not implemented.');
  }
  setMaxListeners(n: number): this {
    throw new Error('Method not implemented.');
  }
  getMaxListeners(): number {
    throw new Error('Method not implemented.');
  }
  listeners<K>(eventName: string | symbol): AnyFunction[] {
    throw new Error('Method not implemented.');
  }
  rawListeners<K>(eventName: string | symbol): AnyFunction[] {
    throw new Error('Method not implemented.');
  }
  emit<K>(eventName: string | symbol, ...args: any[]): boolean {
    throw new Error('Method not implemented.');
  }
  listenerCount<K>(eventName: string | symbol, listener?: AnyFunction | undefined): number {
    throw new Error('Method not implemented.');
  }
  eventNames(): (string | symbol)[] {
    throw new Error('Method not implemented.');
  }
  customLevels!: {};
  useOnlyCustomLevels!: boolean;
}

export type BaseLogger = PinoBaseLogger;

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      // We are creating a provider for our custom `Logger` class
      provide: Logger,
      inject: [ConfigService],
      // This factory builds a pure, singleton pino instance
      useFactory: (configService: ConfigService): ILogger => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';

        const pinoOptions = isProduction
          ? {
              level: 'info',
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
