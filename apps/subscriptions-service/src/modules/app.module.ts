import { Module } from '@nestjs/common';
import { AuthStaticModule } from '@poslah/util/ready-modules/auth-static-module';
import { GlobalDbModule } from '@poslah/util/ready-modules/global-db-module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';
import { rootImports } from '@poslah/util/root-imports';
import { registerGRPCClientsModule } from '@poslah/util/register-grpc-module';
import { chatsGRPCConfig } from '@poslah/chats-service/grpc/chats.grpc-config';
import { join } from 'path';

@Module({
  imports: [
    ...rootImports,
    GlobalDbModule,
    RedisStaticModule,
    AuthStaticModule,
    registerGRPCClientsModule([chatsGRPCConfig], join(__dirname, '../../certs')),

    // HttpModule,

    // GatewayModule,
  ],
  controllers: [],
})
export class AppModule {}
