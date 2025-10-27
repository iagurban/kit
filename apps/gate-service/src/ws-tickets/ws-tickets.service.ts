import { Injectable } from '@nestjs/common';
import { RedisService } from '@poslah/util/modules/nosql/redis/redis.service';
import { randomBytes } from 'crypto';

@Injectable()
export class WsTicketsService {
  private static readonly redisPrefix = 'ws-ticket';

  constructor(private readonly redis: RedisService) {}

  async issue(): Promise<string> {
    const ticket = randomBytes(16).toString('hex');
    await this.redis.set(`${WsTicketsService.redisPrefix}:${ticket}`, '1', 'EX', 30);
    return ticket;
  }

  async consume(ticket: string): Promise<boolean> {
    return (await this.redis.del(`${WsTicketsService.redisPrefix}:${ticket}`)) > 0;
  }
}
