import path from 'node:path';

import { ConfigService } from '@nestjs/config';
import { GRPCConfig } from '@poslah/util/register-grpc-module';

export const messagesGRPCConfig = (configService: ConfigService): GRPCConfig => ({
  path: 'grpc/messages.proto',
  package: 'poslah.messages',
  url: configService.getOrThrow<string>('MESSAGES_SERVICE_GRPC_URL'),
  dir: path.join(__dirname, '../..'),
});
