import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { GrpcAuthInterceptor } from './grpc-auth.interceptor';
import { GrpcExceptionFilter } from './grpc-exception-filter';
import { TokenCheckerModule } from './token-checker.module';

@Module({
  imports: [TokenCheckerModule],
  providers: [
    GrpcAuthInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useExisting: GrpcAuthInterceptor,
    },

    GrpcExceptionFilter,
    {
      provide: APP_FILTER,
      useExisting: GrpcExceptionFilter,
    },
  ],
  exports: [GrpcAuthInterceptor, GrpcExceptionFilter],
})
export class GrpcAuthModule {}
