import path from 'node:path';

import { declareGRPCConfig } from '@poslah/util/declare-grpc-config';

export const chatsGRPCConfig = declareGRPCConfig('CHATS_SERVICE_CLIENT', config => ({
  path: 'grpc/chats.proto',
  package: 'poslah.chats',
  url: config.getOrThrow<string>('CHATS_SERVICE_GRPC_URL'),
  dir: path.join(__dirname, '..'),
}));
