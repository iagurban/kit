import { once } from '@gurban/kit/core/once';
import { Module, OnModuleInit } from '@nestjs/common';
import { registerGraphqlSubgraphModule } from '@poslah/auth-service/register-graphql-subtree-module';
import { KafkaModule } from '@poslah/database/kafka/kafka.module';
import { RabbitmqModule } from '@poslah/database/rabbitmq/rabbitmq.module';
import { RedisModule } from '@poslah/database/redis/redis.module';
import { RedisService } from '@poslah/database/redis/redis.service';
import { RedisScriptManager } from '@poslah/database/redis/redis-script-manager';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';
import { rootImports } from '@poslah/util/root-imports';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from './chats/chats.module';
import { publishGraphqlSubgraph } from './publish-graphql-subgraph';

const schemaPath = join(process.cwd(), 'src/schema.graphql');

@Module({
  imports: [
    ...rootImports,
    registerGraphqlSubgraphModule(schemaPath),
    RabbitmqModule,
    KafkaModule,
    ChatsModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly redis: RedisService,
    private readonly scriptManager: RedisScriptManager,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, `Chats:${AppModule.name}`);
  }

  async onModuleInit() {
    await publishGraphqlSubgraph({
      redis: this.redis,
      scriptManager: this.scriptManager,
      logger: this.loggerBase,
      serviceName: 'chats', // The name of this subgraph
      schemaPath: schemaPath, // Path to its schema file
    });
  }
}
