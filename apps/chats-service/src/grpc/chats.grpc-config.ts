import { declareGRPCConfig } from '@poslah/util/declare-grpc-config';

export const chatsGRPCConfig = declareGRPCConfig('CHATS_SERVICE_CLIENT', config => ({
  path: '../../apps/chats-service/src/grpc/chats.proto',
  package: 'poslah.chats',
  url: config.getOrThrow<string>('CHATS_SERVICE_GRPC_URL'),
}));
