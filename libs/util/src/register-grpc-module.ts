import { credentials, ServerCredentials } from '@grpc/grpc-js';
import { isROArray } from '@gurban/kit/core/checks';
import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { readFileSync } from 'fs';
import Long from 'long';
import { join } from 'path';

export type GRPCConfig = {
  url: string;
  package: string;
  path: string;
  dir: string;
  channelOptions?: Record<string, unknown>;
};

export const grpcLoaderOptions = {
  keepCase: false, // Explicitly convert snake_case to camelCase
  longs: Long,
  defaults: true,
  oneofs: true,
} as const;

const loadServerCreds = (certsPath: string) =>
  ServerCredentials.createSsl(
    readFileSync(join(certsPath, 'ca.crt')),
    [
      {
        private_key: readFileSync(join(certsPath, 'server.key')),
        cert_chain: readFileSync(join(certsPath, 'server.crt')),
      },
    ],
    true // This is the "mutual" part.
  );

const loadClientCreds = (certsPath: string) =>
  credentials.createSsl(
    // 1. Read the public CA certificate. This is for VERIFYING THE SERVER.
    readFileSync(join(certsPath, 'ca.crt')),
    // 2. Read the client's private key. This is for PROVING ITS OWN IDENTITY.
    readFileSync(join(certsPath, 'client.key')),
    // 3. Read the client's public certificate. This is also for PROVING ITS OWN IDENTITY.
    readFileSync(join(certsPath, 'client.crt'))
  );

const isClientSymbol: unique symbol = Symbol(`GRPC_IS_CLIENT`);

export const createGRPCMicroservice = (
  { url, package: _package, path, dir, channelOptions }: GRPCConfig,
  certsDir: string | null,
  isClient?: typeof isClientSymbol
) =>
  ({
    transport: Transport.GRPC,
    options: {
      package: _package,
      protoPath: join(dir, path),
      url,
      loader: grpcLoaderOptions,
      credentials:
        certsDir != null ? (isClient ? loadClientCreds(certsDir) : loadServerCreds(certsDir)) : undefined,
      channelOptions,
    },
  }) as const;

type Fabric = (configService: ConfigService) => GRPCConfig;

export function registerGRPCClientsModule(
  clients: Record<string | symbol, Fabric>,
  certsDir: string
): DynamicModule;
export function registerGRPCClientsModule(
  clients: readonly { clientName: string; config: Fabric }[],
  certsDir: string
): DynamicModule;

export function registerGRPCClientsModule(
  clients: Record<string | symbol, Fabric> | readonly { clientName: string; config: Fabric }[],
  certsDir: string
): DynamicModule {
  return ClientsModule.registerAsync({
    clients: (isROArray(clients)
      ? clients.map(c => [c.clientName, c.config] as const)
      : Object.entries(clients)
    ).map(([name, o]) => ({
      name, // The injection token
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        createGRPCMicroservice(o(configService), certsDir, isClientSymbol),
    })),
    isGlobal: true,
  });
}
