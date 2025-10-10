import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { Logger } from './logger/logger.module';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Pick<Logger, `error` | `warn`>;

  constructor(parentLogger: Logger) {
    this.logger = parentLogger.child({ context: AllExceptionsFilter.name });
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseJson = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception instanceof Error ? exception.message : 'Internal server error',
    };

    // Для серверных ошибок логируем полный стектрейс
    if (status >= 500) {
      this.logger.error(
        {
          err: exception,
          stack: exception instanceof Error ? exception.stack : undefined,
        },
        `Unhandled exception for request: ${request.method} ${request.url}`
      );
    } else {
      // Для клиентских ошибок (4xx) логируем как предупреждение
      this.logger.warn(
        { response: responseJson },
        `Handled exception for request: ${request.method} ${request.url}`
      );
    }

    response.status(status).send(responseJson);
  }
}
