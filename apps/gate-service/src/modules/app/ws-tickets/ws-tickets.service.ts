import { Injectable } from '@nestjs/common';
import { RedisService } from '@poslah/database/redis/redis.service';
import { randomBytes } from 'crypto';

@Injectable()
export class WsTicketsService {
  private readonly redisPrefix = 'ws-ticket';
  constructor(private readonly redis: RedisService) {}

  async issue(): Promise<string> {
    const ticket = randomBytes(16).toString('hex');
    await this.redis.set(`${this.redisPrefix}:${ticket}`, '1', 'EX', 30);
    return ticket;
  }

  async consume(ticket: string): Promise<boolean> {
    return (await this.redis.del(`${this.redisPrefix}:${ticket}`)) > 0;
  }
}
