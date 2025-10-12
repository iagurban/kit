import { ClientGrpc } from '@nestjs/microservices';

export class GRPCClientBase<T extends object> {
  readonly client: T;

  constructor(grpcClient: ClientGrpc, serviceName: string) {
    this.client = grpcClient.getService<T>(serviceName);
  }
}
