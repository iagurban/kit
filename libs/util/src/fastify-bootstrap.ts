import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
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
    microservices: (app: NestFastifyApplication, config: ConfigService) => readonly MicroserviceOptions[];
  }
) => {
  const app = await NestFactory.create<NestFastifyApplication>(nestModule, new FastifyAdapter(), {
    bufferLogs: true,
  });

  app.useLogger(app.get(RootLogger));

  const logger = app.get(Logger);
  const bootstrapLogger = logger.logger.child({ context: 'Bootstrap' });

  try {
    const configService = app.get(ConfigService);

    app.useGlobalFilters(new AllExceptionsFilter(logger));

    // --- Настройка микросервисов ---
    for (const microservice of options.microservices(app, configService)) {
      app.connectMicroservice(microservice);
    }

    await app.startAllMicroservices();
    bootstrapLogger.info('All microservices started successfully.');

    // --- Запуск основного HTTP-сервера ---
    const port = configService.get<number>('PORT', 3000);
    await app.listen(port, '0.0.0.0');

    bootstrapLogger.info(`🚀 Application is running in hybrid mode on port ${port}`);
    bootstrapLogger.info(`📡 gRPC listening on ${configService.get('GRPC_URL')}`);

    // --- HMR для разработки ---
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    bootstrapLogger.fatal({ err: error }, '❌ Application failed to start during setup');
    await app.close();
    process.exit(1);
  }
};
