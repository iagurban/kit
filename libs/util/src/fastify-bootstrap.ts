import { readFileSync } from 'node:fs';
import { join } from 'node:path';

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
    http2?: { certsDir: string };
    server?: string | ((config: ConfigService) => string);
    onAppCreated?: (app: NestFastifyApplication) => void;
    onAppConfigured?: (app: NestFastifyApplication) => void;
    onAppListening?: (app: NestFastifyApplication) => void;
  }
): Promise<NestFastifyApplication<RawServerDefault>> => {
  const app = await NestFactory.create<NestFastifyApplication>(
    nestModule,
    options.http2
      ? new FastifyAdapter({
          http2: true,
          https: {
            key: readFileSync(join(options.http2.certsDir, 'server.key')),
            cert: readFileSync(join(options.http2.certsDir, 'server.crt')),
            ca: readFileSync(join(options.http2.certsDir, 'ca.crt')),
            requestCert: true,
            rejectUnauthorized: false,
          },
        })
      : new FastifyAdapter(),
    {
      bufferLogs: true,
      bodyParser: options.bodyParser ?? true,
    }
  );

  // When running in HTTP/2 mode, we must manually teach Fastify how to handle gRPC requests.
  if (options.http2) {
    app
      .getHttpAdapter()
      .getInstance()
      .addContentTypeParser('application/grpc', (request, payload, done) => {
        // Pass the raw body to the gRPC microservice.
        done(null, payload);
      });
  }

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
      const server = options.server
        ? typeof options.server === 'function'
          ? options.server(configService)
          : options.server
        : '0.0.0.0';
      await app.listen(portValue, server);

      logger.info(`🚀 Application is running in hybrid mode on ${server}:${portValue}`);
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
