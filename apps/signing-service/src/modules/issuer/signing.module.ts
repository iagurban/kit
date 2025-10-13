import { Module } from '@nestjs/common';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { SigningController } from './signing.controller';
import { SigningGrpcController } from './signing.grpc-controller';
import { SigningService } from './signing.service';

const consumersGroup = 'chats-service';

@Module({
  imports: [
    RedisStaticModule,
    // RedisStreamConsumerModule.forRoot(
    //   {
    //     [rawCreateEventTopic.name]: consumersGroup,
    //     [membershipChangedEventTopic.name]: consumersGroup,
    //   },
    //   RedisStaticModule
    // ),
  ],
  controllers: [SigningController, SigningGrpcController],
  providers: [SigningService],
})
export class SigningModule {}
