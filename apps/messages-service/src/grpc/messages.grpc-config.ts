import { declareGRPCConfig } from '@poslah/util/declare-grpc-config';

export const messagesGRPCConfig = declareGRPCConfig('MESSAGES_SERVICE_CLIENT', config => ({
  path: '../../apps/messages-service/src/grpc/messages.proto',
  package: 'poslah.messages',
  url: config.getOrThrow<string>('MESSAGES_SERVICE_GRPC_URL'),
}));
