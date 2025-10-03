import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rootImports } from '@poslah/util/root-imports';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ...rootImports,
    ClientsModule.registerAsync([
      {
        name: 'CHATS_SERVICE_CLIENT', // The injection token
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'poslah.chats',
            protoPath: join(process.cwd(), '../../apps/chats-service/src/grpc/chats.proto'),
            url: configService.getOrThrow<string>('CHATS_SERVICE_GRPC_URL'),
            loader: {
              longs: BigInt,
              defaults: true,
              oneofs: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
