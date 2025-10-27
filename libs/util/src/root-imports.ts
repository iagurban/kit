import { ServiceInfoModule } from '@gurban/kit/nest/service-info';
import { ConfigModule } from '@nestjs/config';
import { GrpcAuthModule } from '@poslah/signing-service/token-checker-module/grpc-auth.module';

import { LoggerModule } from './modules/logger/logger.module';

export const rootImports = (name: string, shortName: string) => [
  ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
  }),
  LoggerModule,
  ServiceInfoModule.forRootGlobal(name, shortName),
  GrpcAuthModule,
];
