import path from 'node:path';

import { declareGRPCConfig } from '@poslah/util/declare-grpc-config';

/**
 * Config for the gRPC **Server** that runs inside the signing-service.
 * This is used in `main.ts` to create the microservice.
 */
export const privateSigningGRPCConfig = declareGRPCConfig('SIGNING_SERVICE_CLIENT', config => ({
  path: 'grpc/signing.proto',
  package: 'poslah.signing',
  // Use the dedicated gRPC URL for the server to listen on.
  url: config.getOrThrow<string>('SIGNING_SERVICE_GRPC_URL'),
  dir: path.join(__dirname, '..'),
}));

/**
 * Config for gRPC **Clients** in other services that need to connect to the signing-service.
 * It correctly points to the public-facing proxy port.
 */
export const signingGRPCConfig = declareGRPCConfig('SIGNING_SERVICE_CLIENT', config => ({
  path: 'grpc/signing.proto',
  package: 'poslah.signing',
  url: `${config.getOrThrow('SIGNING_SERVICE_HOST')}:${config.getOrThrow('SIGNING_SERVICE_PORT')}`,
  dir: path.join(__dirname, '..'),
  // channelOptions: {
  //   // This forces the client to validate the proxy's certificate against 'localhost',
  //   // resolving the ERR_TLS_CERT_ALTNAME_INVALID error without needing to change the cert.
  //   'grpc.ssl_target_name_override': 'localhost',
  // },
}));
