import { status as GrpcStatus } from '@grpc/grpc-js';
import { isSomeObject } from '@gurban/kit/core/checks';
import { ArgumentsHost, Catch, ExceptionFilter, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

/**
 * A global exception filter to catch all errors within the gRPC server,
 * log them, and convert them into a standard RpcException.
 * This prevents silent crashes and RST_STREAM errors on the client.
 */
@Catch()
@Injectable()
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): Observable<unknown> {
    // For now, we log the raw exception to the console to ensure we see it.
    console.error('GRPC EXCEPTION FILTER CAUGHT:', exception);

    const [status, message] = isSomeObject(exception)
      ? [exception.code || GrpcStatus.INTERNAL, exception.message || 'Internal server error']
      : [];

    // Ensure a proper RpcException is always thrown.
    return throwError(() => new RpcException({ code: status, message }));
  }
}
