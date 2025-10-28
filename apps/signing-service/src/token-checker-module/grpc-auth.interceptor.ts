import { Metadata, status as GrpcStatus } from '@grpc/grpc-js';
import { ServiceInfo } from '@gurban/kit/nest/service-info'; // Adjust path
import { errorToString } from '@gurban/kit/utils/error-utils';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { TokenCheckerService } from './token-checker.service';

@Injectable()
export class GrpcAuthInterceptor implements NestInterceptor {
  constructor(
    private readonly tokenChecker: TokenCheckerService,
    private readonly serviceInfo: ServiceInfo
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    // Check if this is an RPC call. If not, skip.
    if (context.getType() !== 'rpc') {
      return next.handle();
    }

    const rpcContext = context.switchToRpc();

    const metadata = rpcContext.getContext<Metadata>();
    if (!metadata) {
      throw new RpcException({
        code: GrpcStatus.INVALID_ARGUMENT,
        message: 'Missing metadata',
      });
    }

    const methodName = context.getHandler().name;

    try {
      await this.tokenChecker.assertAuthorization(metadata, this.serviceInfo.name, methodName);
    } catch (error) {
      throw new RpcException({
        code: GrpcStatus.UNAUTHENTICATED,
        message: errorToString(error) || 'Invalid or missing service token',
      });
    }

    // If auth succeeds, proceed to the actual gRPC handler.
    return next.handle();
  }
}
