import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { RawServerDefault } from 'fastify';

import { Logger } from './logger/logger.module';

declare const module: {
  hot?: { accept: () => void; dispose: (callback: () => void) => void };
};

type IEntryNestModule = Type | DynamicModule | ForwardReference | Promise<IEntryNestModule>;

export const fastifyBootstrap = async (
  nestModule: IEntryNestModule,
  port: number | null | ((config: ConfigService) => number | null),
  options: {
    microservices?: (app: NestFastifyApplication, config: ConfigService) => readonly MicroserviceOptions[];
    bodyParser?: boolean;
    noHotReload?: boolean;
    server?: string | ((config: ConfigService) => string);
    onAppCreated?: (app: NestFastifyApplication) => void;
    onAppConfigured?: (app: NestFastifyApplication) => void;
    onAppListening?: (app: NestFastifyApplication) => void;
  }
): Promise<NestFastifyApplication<RawServerDefault>> => {
  const app = await NestFactory.create<NestFastifyApplication>(nestModule, new FastifyAdapter(), {
    bufferLogs: true,
    bodyParser: options.bodyParser ?? true,
  });
  options.onAppCreated?.(app);

  // app.useLogger(app.get(Logger));

  const rootLogger = app.get(Logger);
  const logger = rootLogger.child({ context: 'Bootstrap' });

  try {
    const configService = app.get(ConfigService);

    /// TODO
    // app.useGlobalFilters(new AllExceptionsFilter(rootLogger));

    // --- Настройка микросервисов ---
    const microservices = options.microservices?.(app, configService);
    if (microservices?.length) {
      for (const microservice of microservices) {
        app.connectMicroservice(microservice);
      }

      await app.startAllMicroservices();
      logger.info('All microservices started successfully.');
    }

    options.onAppConfigured?.(app);

    const portValue = typeof port === 'function' ? port(configService) : port;

    if (portValue != null) {
      await app.listen(
        portValue,
        options.server
          ? typeof options.server === 'function'
            ? options.server(configService)
            : options.server
          : '0.0.0.0'
      );

      logger.info(`🚀 Application is running in hybrid mode on port ${portValue}`);
      // logger.info(`📡 gRPC listening on ${configService.get('GRPC_URL')}`);
      options.onAppListening?.(app);
    }

    // --- HMR для разработки ---
    if (options.noHotReload !== true && module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

    return app;
  } catch (error) {
    logger.fatal({ err: error }, '❌ Application failed to start during setup');
    await app.close();
    process.exit(1);
  }
};
