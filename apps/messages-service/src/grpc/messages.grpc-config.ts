import path from 'node:path';

import { declareGRPCConfig } from '@poslah/util/declare-grpc-config';

export const messagesGRPCConfig = declareGRPCConfig('MESSAGES_SERVICE_CLIENT', config => ({
  path: 'grpc/messages.proto',
  package: 'poslah.messages',
  url: config.getOrThrow<string>('MESSAGES_SERVICE_GRPC_URL'),
  dir: path.join(__dirname, '..'),
}));
