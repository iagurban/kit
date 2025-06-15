import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

import { AppModule } from './modules/app.module';

declare const module: { hot: { accept: () => void; dispose: (callback: () => void) => void } };

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Определяем статус
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Текст и стек ошибки
    const message = exception instanceof Error ? exception.message : 'Unexpected error';
    const stack = exception instanceof Error ? exception.stack : 'no stack';

    // Логируем стек только для 500 ошибок
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`URL: ${request?.url} ▶ ${message}\n${stack}`);
    } else {
      this.logger.warn(`URL: ${request?.url} ▶ ${message}`);
    }

    // Отправляем клиенту
    if (response) {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request?.url,
        message,
      });
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    cors: {
      origin: 'http://localhost:5173',
      credentials: true, // если используешь куки или авторизацию
    },
  });

  // app.useGlobalFilters(new AllExceptionsFilter());

  app.use(cookieParser());

  await app.listen(process.env['PORT'] ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
void bootstrap();
