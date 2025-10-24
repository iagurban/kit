import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthStaticModule } from '@poslah/util/ready-modules/auth-static-module';
import { GlobalDbModule } from '@poslah/util/ready-modules/global-db-module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';
import { rootImports } from '@poslah/util/root-imports';

import { AppController } from './app.controller';
import { GatewayModule } from './gateway-module/gateway.module';
import { KeycloakAuthController } from './keycloak-auth.controller';
import { WsTicketsController } from './ws-tickets/ws-tickets.controller';
import { WsTicketsService } from './ws-tickets/ws-tickets.service';

@Module({
  imports: [
    ...rootImports,
    GlobalDbModule,
    RedisStaticModule,
    AuthStaticModule,
    // registerGRPCClientsModule([messagesGRPCConfig], join(__dirname, '../../certs')),

    HttpModule,

    GatewayModule,
  ],
  providers: [WsTicketsService],
  controllers: [AppController, KeycloakAuthController, WsTicketsController],
})
export class AppModule {}
