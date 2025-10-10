import { notNull } from '@gurban/kit/utils/flow-utils';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { RedisFabric } from '@poslah/database/redis/redis-client.factory';
import { RedisStreamHandler } from '@poslah/database/redis/redis-stream-handler.decorator';
import { IWithModuleRef } from '@poslah/util/with-module-ref.interface';
import { Redis } from 'ioredis';

@Injectable()
export class RedisStreamConsumerService implements IWithModuleRef {
  private redis?: Redis;

  constructor(
    private readonly redisFabric: RedisFabric,
    public readonly moduleRef: ModuleRef
  ) {}

  // The onModuleInit is no longer needed for setting the handler,
  // but we can use it to get the redis client and start producing messages.
  async onModuleInit() {
    this.redis = await this.redisFabric.create();
    this.produceTestMessages();
  }

  /**
   * This method is now decorated. The discovery service will automatically
   * find it and link it to the correct RedisStreamConsumer instance.
   */
  @RedisStreamHandler('post-render-requests')
  public async handlePostRender(message: Record<string, unknown>): Promise<void> {
    console.log(`[AppService Handler] Processing message ${message.id} from stream...`);

    const { postId, format } = message.data as Record<string, string>;
    if (!postId || !format) {
      throw new Error('Message is missing required fields: postId, format');
    }

    console.log(`> Rendering post ${postId} to format ${format}...`);

    // Simulate an async rendering task
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

    console.log(`> Finished rendering post ${postId}.`);
  }

  getHello(): string {
    return 'Hello World!';
  }

  async produceTestMessages() {
    console.log('Producing test messages in 3 seconds...');
    await new Promise(res => setTimeout(res, 3000));
    setInterval(async () => {
      const postId = Math.floor(Math.random() * 1000);
      console.log(`Adding post ${postId} to render stream...`);
      await notNull(this.redis).xadd(
        'post-render-requests',
        '*', // '*' tells Redis to auto-generate a timestamped ID
        'postId',
        postId,
        'format',
        'pdf'
      );
    }, 5000);
  }
}
