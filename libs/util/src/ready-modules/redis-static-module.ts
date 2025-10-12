import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@poslah/database/redis/redis.module';
import { RedisService, RedisSubscriptionService } from '@poslah/database/redis/redis.service';

@Module({
  imports: [
    RedisModule.forRoot({
      default: {
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          host: config.getOrThrow<string>('REDIS_HOST', '0.0.0.0'),
          port: config.getOrThrow<number>('REDIS_PORT'),
        }),
        instance: RedisService,
      },
      subscription: {
        useConfig: `default`,
        instance: RedisSubscriptionService,
      },
    }),
  ],
  exports: [RedisModule],
})
export class RedisStaticModule {}
