import { credentials, ServerCredentials } from '@grpc/grpc-js';
import { isROArray } from '@gurban/kit/core/checks';
import { DynamicModule, INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GrpcAuthInterceptor } from '@poslah/signing-service/token-checker-module/grpc-auth.interceptor';
import { GrpcExceptionFilter } from '@poslah/signing-service/token-checker-module/grpc-exception-filter';
import { readFileSync } from 'fs';
import Long from 'long';
import { join } from 'path';

import { Logger } from './logger/logger.module';

export type GRPCConfig = {
  url: string;
  package: string;
  path: string;
  channelOptions?: Record<string, unknown>;
  noMTls?: boolean;
};

export const grpcLoaderOptions = {
  keepCase: false, // Explicitly convert snake_case to camelCase
  longs: Long,
  defaults: true,
  oneofs: true,
} as const;

const loadServerCreds = (configService: ConfigService) =>
  ServerCredentials.createSsl(
    readFileSync(join(process.cwd(), configService.getOrThrow(`CERTS_CA_CRT`))),
    [
      {
        private_key: readFileSync(join(process.cwd(), configService.getOrThrow(`CERTS_SERVER_KEY`))),
        cert_chain: readFileSync(join(process.cwd(), configService.getOrThrow(`CERTS_SERVER_CRT`))),
      },
    ],
    true // This is the "mutual" part.
  );

const loadClientCreds = (configService: ConfigService<Record<string, string>>) =>
  credentials.createSsl(
    // 1. Read the public CA certificate. This is for VERIFYING THE SERVER.
    readFileSync(join(process.cwd(), configService.getOrThrow(`CERTS_CA_CRT`))),
    // 2. Read the client's private key. This is for PROVING ITS OWN IDENTITY.
    readFileSync(join(process.cwd(), configService.getOrThrow(`CERTS_CLIENT_KEY`))),
    // 3. Read the client's public certificate. This is also for PROVING ITS OWN IDENTITY.
    readFileSync(join(process.cwd(), configService.getOrThrow(`CERTS_CLIENT_CRT`)))
  );

export const createGRPCMicroservice = async (
  app: INestApplication | null, // if `null` - it is a client
  config: ConfigService,
  { url, package: _package, path: _path, channelOptions, noMTls }: GRPCConfig
) => {
  if (app) {
    const logger = await app.resolve(Logger); // Resolve the logger from the app
    logger.trace('Secure gRPC server detected. Verifying security interceptors...');

    try {
      await app.resolve(GrpcAuthInterceptor);
      await app.resolve(GrpcExceptionFilter);
      logger.debug('gRPC security check passed: GrpcAuthInterceptor is registered.');
    } catch (error) {
      logger.fatal(
        { error },
        `Failed to resolve APP_INTERCEPTOR or APP_FILTER for gRPC. It's auth cannot be verified. Did you forget to import GrpcAuthModule?`
      );
      throw error;
    }
  }

  return {
    transport: Transport.GRPC,
    options: {
      package: _package,
      protoPath: join(process.cwd(), _path),
      url,
      loader: grpcLoaderOptions,
      credentials: !noMTls ? (!app ? loadClientCreds(config) : loadServerCreds(config)) : undefined,
      channelOptions,
    },
  } as const;
};

type Fabric = (configService: ConfigService) => GRPCConfig;

export function registerGRPCClientsModule(clients: Record<string | symbol, Fabric>): DynamicModule;
export function registerGRPCClientsModule(
  clients: readonly { clientName: string; config: Fabric }[]
): DynamicModule;

export function registerGRPCClientsModule(
  clients: Record<string | symbol, Fabric> | readonly { clientName: string; config: Fabric }[]
): DynamicModule {
  return ClientsModule.registerAsync({
    clients: (isROArray(clients)
      ? clients.map(c => [c.clientName, c.config] as const)
      : Object.entries(clients)
    ).map(([name, fabric]) => ({
      name, // The injection token
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => createGRPCMicroservice(null, config, fabric(config)),
    })),
    isGlobal: true,
  });
}
