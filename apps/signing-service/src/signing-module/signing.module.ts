import { Module } from '@nestjs/common';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { SigningController } from './signing.controller';
import { SigningGrpcController } from './signing.grpc-controller';
import { SigningService } from './signing.service';

@Module({
  imports: [
    RedisStaticModule,
    // RedisStreamConsumerModule.forRoot(
    //   [rawCreateEventTopic.name, membershipChangedEventTopic.name],
    //   RedisStaticModule
    // ),
  ],
  controllers: [SigningController, SigningGrpcController],
  providers: [SigningService],
})
export class SigningModule {}
