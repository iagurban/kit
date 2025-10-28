import { Injectable } from '@nestjs/common';
import { CacheService } from '@poslah/util/modules/nosql/redis/cache.service';
import { randomBytes } from 'crypto';

@Injectable()
export class WsTicketsService {
  private static readonly redisPrefix = 'ws-ticket';

  constructor(private readonly cache: CacheService) {}

  async issue(): Promise<string> {
    const ticket = randomBytes(16).toString('hex');
    await this.cache.setKey(`${WsTicketsService.redisPrefix}:${ticket}`, '1', { ttl: 30 });
    return ticket;
  }

  async consume(ticket: string): Promise<boolean> {
    return (await this.cache.deleteKey(`${WsTicketsService.redisPrefix}:${ticket}`)) > 0;
  }
}
