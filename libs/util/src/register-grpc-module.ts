import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import Long from 'long';
import { join } from 'path';

export type GRPCConfig = {
  url: string;
  package: string;
  path: string;
  dir: string;
};

export const grpcLoaderOptions = {
  longs: Long,
  defaults: true,
  oneofs: true,
} as const;

export const createGRPCMicroservice = ({ url, package: _package, path, dir }: GRPCConfig) =>
  ({
    transport: Transport.GRPC,
    options: {
      package: _package,
      protoPath: join(dir, path),
      url,
      loader: grpcLoaderOptions,
    },
  }) as const;

export const registerGRPCModule = (name: string | symbol, o: (configService: ConfigService) => GRPCConfig) =>
  ClientsModule.registerAsync([
    {
      name, // The injection token
      useFactory: (configService: ConfigService) => createGRPCMicroservice(o(configService)),
      inject: [ConfigService],
    },
  ]);
