import { status as GrpcStatus } from '@grpc/grpc-js';
import { isSomeObject } from '@gurban/kit/core/checks';
import { errorToString } from '@gurban/kit/utils/error-utils';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
  private static httpToGrpcMapping: Record<number, GrpcStatus> = {
    400: GrpcStatus.INVALID_ARGUMENT, // Bad Request
    422: GrpcStatus.INVALID_ARGUMENT, // Unprocessable Entity
    401: GrpcStatus.UNAUTHENTICATED, // Unauthorized
    403: GrpcStatus.PERMISSION_DENIED, // Forbidden
    404: GrpcStatus.NOT_FOUND, // Not Found
    408: GrpcStatus.DEADLINE_EXCEEDED, // Request Timeout
    409: GrpcStatus.ALREADY_EXISTS, // Conflict
    412: GrpcStatus.FAILED_PRECONDITION, // Precondition Failed
    429: GrpcStatus.RESOURCE_EXHAUSTED, // Too Many Requests
    501: GrpcStatus.UNIMPLEMENTED, // Not Implemented
    503: GrpcStatus.UNAVAILABLE, // Service Unavailable
    504: GrpcStatus.DEADLINE_EXCEEDED, // Gateway Timeout
  };

  private httpToGrpcStatus(status: number): GrpcStatus {
    return GrpcExceptionFilter.httpToGrpcMapping[status] || GrpcStatus.INTERNAL;
  }

  // Pre-calculate valid numeric GrpcStatus values for efficient lookup
  private static readonly grpcStatuses = new Set(
    Object.values(GrpcStatus).filter((v): v is GrpcStatus => typeof v === 'number')
  );

  catch(exception: unknown, host: ArgumentsHost): Observable<unknown> {
    const ctxType = host.getType();

    // This filter is only for gRPC contexts
    if (ctxType !== 'rpc') {
      return throwError(() => exception);
    }

    // Map common NestJS HttpExceptions
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const grpcCode: GrpcStatus = this.httpToGrpcStatus(status);

      // Return a gRPC-formatted error
      return throwError(
        () =>
          new RpcException({
            code: grpcCode,
            message: exception.message,
          })
      );
    }

    // Handle RpcExceptions (already in the correct format)
    if (exception instanceof RpcException) {
      return throwError(() => exception);
    }

    if (isSomeObject(exception) && `code` in exception && `message` in exception) {
      const grpcCode: GrpcStatus =
        typeof exception.code === 'number'
          ? // If the 'code' property is a number, first check if it's a valid gRPC status code.
            GrpcExceptionFilter.grpcStatuses.has(exception.code)
            ? exception.code // It's already a valid gRPC status number
            : // Otherwise, assume it's an HTTP status code and map it.
              this.httpToGrpcStatus(exception.code)
          : GrpcStatus.INTERNAL;

      return throwError(
        () =>
          new RpcException({
            code: grpcCode,
            message: exception.message,
          })
      );
    }

    // Handle all other unknown errors
    return throwError(
      () =>
        new RpcException({
          code: GrpcStatus.INTERNAL,
          message: errorToString(exception) || 'An internal error occurred',
        })
    );
  }
}
