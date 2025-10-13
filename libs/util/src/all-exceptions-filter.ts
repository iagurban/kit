import { once } from '@gurban/kit/core/once';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { createContextualLogger, Logger } from './logger/logger.module';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggerBase: Logger) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, AllExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    // If response is an empty object, try to get it from the host arguments
    // This can happen in some proxy/middleware scenarios
    if (response && typeof response === 'object' && Object.keys(response).length === 0) {
      const [, res] = host.getArgs();
      response = res;
    }

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseJson = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request?.url,
      message: exception instanceof Error ? exception.message : 'Internal server error',
    };

    if (status >= 500) {
      this.logger.error(
        {
          err: exception,
          stack: exception instanceof Error ? exception.stack : undefined,
        },
        `Unhandled exception for request: ${request?.method} ${request?.url}`
      );
    } else {
      this.logger.warn(
        { response: responseJson },
        `Handled exception for request: ${request?.method} ${request?.url}`
      );
    }

    // Check if response is a valid Fastify reply and has not been sent
    if (response && typeof response.code === 'function' && !response.sent) {
      response.code(status).send(responseJson);
    } else if (
      response &&
      typeof (response as typeof response & { setHeader: unknown }).setHeader === 'function'
    ) {
      // Fallback for raw http.ServerResponse, checking if headers have been sent
      const rawResponse = response as unknown as import('http').ServerResponse;
      if (!rawResponse.headersSent) {
        rawResponse.statusCode = status;
        rawResponse.setHeader('Content-Type', 'application/json');
        rawResponse.end(JSON.stringify(responseJson));
      }
    } else {
      // If we cannot determine the response type or it's already sent, log it.
      this.logger.error(
        `Failed to send error response for ${request?.method} ${request?.url}. The response object may be invalid or the response may have already been sent.`
      );
    }
  }
}
