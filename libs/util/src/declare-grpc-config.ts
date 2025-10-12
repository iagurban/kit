import { ConfigService } from '@nestjs/config';

import { GRPCConfig } from './register-grpc-module';

export const declareGRPCConfig = <ClientName extends string>(
  clientName: ClientName,
  config: (configService: ConfigService) => GRPCConfig
) => ({ clientName, config });
