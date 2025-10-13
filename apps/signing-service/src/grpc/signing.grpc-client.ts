import { once } from '@gurban/kit/core/once';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { GRPCClientBase } from '@poslah/util/grpc-client-base';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';

import { SIGNING_SERVICE_NAME, SigningServiceClient } from '../generated/grpc/src/grpc/signing';
import { privateSigningGRPCConfig } from './signing.grpc-config';

@Injectable()
export class SigningGRPCClient extends GRPCClientBase<SigningServiceClient> {
  constructor(
    private readonly loggerBase: Logger,
    @Inject(privateSigningGRPCConfig.clientName) grpcClient: ClientGrpc
  ) {
    super(grpcClient, SIGNING_SERVICE_NAME);
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, SigningGRPCClient.name);
  }
}
