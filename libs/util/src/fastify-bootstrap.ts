import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { RawServerDefault } from 'fastify';
import { Logger as RootLogger } from 'nestjs-pino/Logger';

import { AllExceptionsFilter } from './all-exceptions-filter';
import { Logger } from './logger/logger.module';

declare const module: {
  hot?: { accept: () => void; dispose: (callback: () => void) => void };
};

type IEntryNestModule = Type | DynamicModule | ForwardReference | Promise<IEntryNestModule>;

export const fastifyBootstrap = async (
  nestModule: IEntryNestModule,
  options: {
    microservices?: (app: NestFastifyApplication, config: ConfigService) => readonly MicroserviceOptions[];
    bodyParser?: boolean;
    noListen?: boolean;
    noHotReload?: boolean;
  }
): Promise<NestFastifyApplication<RawServerDefault>> => {
  const app = await NestFactory.create<NestFastifyApplication>(nestModule, new FastifyAdapter(), {
    bufferLogs: true,
    bodyParser: options.bodyParser ?? true,
  });

  app.useLogger(app.get(RootLogger));

  const rootLogger = app.get(Logger);
  const logger = rootLogger.logger.child({ context: 'Bootstrap' });

  try {
    const configService = app.get(ConfigService);

    app.useGlobalFilters(new AllExceptionsFilter(rootLogger));

    // --- Настройка микросервисов ---
    const microservices = options.microservices?.(app, configService);
    if (microservices?.length) {
      for (const microservice of microservices) {
        app.connectMicroservice(microservice);
      }

      await app.startAllMicroservices();
      logger.info('All microservices started successfully.');
    }

    if (options.noListen !== true) {
      // --- Запуск основного HTTP-сервера ---
      const port = configService.get<number>('PORT', 3000);
      await app.listen(port, '0.0.0.0');

      logger.info(`🚀 Application is running in hybrid mode on port ${port}`);
      logger.info(`📡 gRPC listening on ${configService.get('GRPC_URL')}`);
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
