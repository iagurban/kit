import path from 'node:path';

import { declareGRPCConfig } from '@poslah/util/declare-grpc-config';

/**
 * Config for the gRPC **Server** that runs inside the signing-service.
 * This is used in `main.ts` to create the microservice.
 */
export const privateSigningGRPCConfig = declareGRPCConfig('SIGNING_SERVICE_CLIENT', config => {
  const grpcUrl = config.getOrThrow<string>('SIGNING_SERVICE_GRPC_URL');
  const port = grpcUrl.split(':')[1];

  return {
    path: '../../apps/signing-service/src/grpc/signing.proto',
    package: 'poslah.signing',
    // ** THE FIX IS HERE **
    // Force the gRPC server to listen on all network interfaces (0.0.0.0).
    // This makes it reachable from inside the Docker container.
    url: `0.0.0.0:${port}`,
    dir: path.join(__dirname, '..'),

    noMTls: true,
  };
});

/**
 * Config for gRPC **Clients** in other services that need to connect to the signing-service.
 * It correctly points to the public-facing proxy port.
 */
export const signingGRPCConfig = declareGRPCConfig('SIGNING_SERVICE_CLIENT', config => ({
  path: '../../apps/signing-service/src/grpc/signing.proto',
  package: 'poslah.signing',
  url: `${config.getOrThrow('SIGNING_SERVICE_HOST')}:${config.getOrThrow('SIGNING_SERVICE_PORT')}`,
  // channelOptions: {
  //   // This forces the client to validate the proxy's certificate against 'localhost',
  //   // resolving the ERR_TLS_CERT_ALTNAME_INVALID error without needing to change the cert.
  //   'grpc.ssl_target_name_override': 'localhost',
  // },
}));
