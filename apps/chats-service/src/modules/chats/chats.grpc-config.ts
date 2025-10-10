import path from 'node:path';

import { ConfigService } from '@nestjs/config';
import { GRPCConfig } from '@poslah/util/register-grpc-module';

export const chatsGRPCConfig = (configService: ConfigService): GRPCConfig => ({
  path: 'grpc/chats.proto',
  package: 'poslah.chats',
  url: configService.getOrThrow<string>('CHATS_SERVICE_GRPC_URL'),
  dir: path.join(__dirname, '../..'),
});
