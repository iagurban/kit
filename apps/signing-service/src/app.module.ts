import { Module } from '@nestjs/common';
import { rootImports } from '@poslah/util/root-imports';

import { SigningModule } from './signing-module/signing.module';

@Module({
  imports: [
    ...rootImports,
    // GlobalDbModule,
    // RedisStaticModule,
    // AuthStaticModule,
    // registerGRPCClientsModule([messagesGRPCConfig], join(__dirname, '../../certs')),

    // GraphqlSubgraphModule.forRoot(`signing`, join(__dirname, 'schema.graphql'), RedisStaticModule),

    SigningModule,
    // MtlsProxyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
