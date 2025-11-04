import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import { FastifyCorsOptions } from '@fastify/cors';
import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import {
  ArgumentsHost,
  CallHandler,
  Catch,
  DynamicModule,
  ExceptionFilter,
  ExecutionContext,
  ForwardReference,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyReply, FastifyRequest, RawServerDefault } from 'fastify';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Logger } from './modules/logger/logger.module';

declare const module: {
  hot?: { accept: () => void; dispose: (callback: () => void) => void };
};

type IEntryNestModule = Type | DynamicModule | ForwardReference | Promise<IEntryNestModule>;

export const createStandaloneConfig = async () => (await NestFactory.create(ConfigModule)).get(ConfigService);

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerBase: Logger) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, HttpLoggingInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // Check if it's an HTTP request
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<FastifyRequest>();
    const response = httpContext.getResponse<FastifyReply>();
    const startTime = Date.now();

    const { method, url } = request;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        this.logger.info(`[${response.statusCode}] ${method} ${url} - ${duration}ms`);
      })
    );
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggerBase: Logger) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, AllExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof Error ? exception.message : 'Internal server error';

    // Log the error
    if (status >= 500) {
      this.logger.error({ exception }, `[${status}] ${request.method} ${request.url} - ${message}`);
    } else {
      this.logger.warn(`[${status}] ${request.method} ${request.url} - ${message}`);
    }

    // Send the JSON response to the client
    response.code(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}

const createHttps = async () => {
  const config = await createStandaloneConfig();
  return {
    key: readFileSync(join(process.cwd(), config.getOrThrow(`CERTS_SERVER_KEY`))),
    cert: readFileSync(join(process.cwd(), config.getOrThrow(`CERTS_SERVER_CRT`))),
    ca: readFileSync(join(process.cwd(), config.getOrThrow(`CERTS_CA_CRT`))),
    requestCert: true,
    rejectUnauthorized: false,
  } as const;
};

export const fastifyBootstrap = async (
  nestModule: IEntryNestModule,
  port: number | null | ((config: ConfigService) => number | null),
  options: {
    microservices?: (
      app: NestFastifyApplication,
      config: ConfigService
    ) => readonly MicroserviceOptions[] | Promise<readonly MicroserviceOptions[]>;
    bodyParser?: boolean;
    noHotReload?: boolean;
    http2?: true;
    https?: true;
    server?: string | ((config: ConfigService) => string);
    onAppCreated?: (app: NestFastifyApplication) => void | Promise<void>;
    onAppConfigured?: (app: NestFastifyApplication) => void;
    onAppListening?: (app: NestFastifyApplication) => void;
    cors?: FastifyCorsOptions | ((app: NestFastifyApplication) => Promise<FastifyCorsOptions>);
    noCookies?: boolean;
  }
): Promise<NestFastifyApplication<RawServerDefault>> => {
  const app = await NestFactory.create<NestFastifyApplication>(
    nestModule,
    options.http2
      ? new FastifyAdapter({ http2: true, https: await createHttps() })
      : options.https
        ? new FastifyAdapter({ https: await createHttps() })
        : new FastifyAdapter(),
    {
      bufferLogs: true,
      bodyParser: options.bodyParser ?? true,
    }
  );

  app.enableShutdownHooks();

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

  if (options.noCookies !== true) {
    await app.register(fastifyCookie, { secret: `asdkjbsohfoiweoh` } as FastifyCookieOptions);
  }

  await options.onAppCreated?.(app);

  if (options.cors) {
    app.enableCors(typeof options.cors === `function` ? await options.cors(app) : options.cors);
  }

  // app.useLogger(app.get(Logger));

  const rootLogger = app.get(Logger);
  const logger = rootLogger.child({ context: 'Bootstrap' });

  try {
    const configService = app.get(ConfigService);

    /// TODO
    // app.useGlobalFilters(new AllExceptionsFilter(rootLogger));

    // --- Настройка микросервисов ---
    const microservices = await options.microservices?.(app, configService);
    if (microservices?.length) {
      for (const microservice of microservices) {
        app.connectMicroservice(microservice);
      }

      await app.startAllMicroservices();
      logger.info('All microservices started successfully.');
    }

    app.useGlobalInterceptors(new HttpLoggingInterceptor(rootLogger));
    app.useGlobalFilters(new AllExceptionsFilter(rootLogger));

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
    logger.error({ error }, '>>> FATAL ERROR during fastifyBootstrap setup:'); // Explicit console.error
    logger.fatal({ err: error }, '❌ Application failed to start during setup');
    await app.close();
    process.exit(1);
  }
};
