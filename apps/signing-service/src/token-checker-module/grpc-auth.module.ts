import { Global, Module } from '@nestjs/common';

import { GrpcAuthInterceptor } from './grpc-auth.interceptor';
import { TokenCheckerModule } from './token-checker.module';

@Global()
@Module({
  imports: [TokenCheckerModule],
  providers: [GrpcAuthInterceptor.provide()],
})
export class GrpcAuthModule {}
