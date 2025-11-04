import { Injectable } from '@nestjs/common';
import { CacheService } from '@poslah/util/modules/cache/cache.module';
import { randomBytes } from 'crypto';

@Injectable()
export class WsTicketsService {
  private static readonly redisPrefix = (ticket: string) => `ws-ticket:${ticket}`;

  constructor(private readonly cache: CacheService) {}

  async issue(): Promise<string> {
    const ticket = randomBytes(16).toString('hex');
    await this.cache.setKey(WsTicketsService.redisPrefix(ticket), '1', { ttl: 30 });
    return ticket;
  }

  async consume(ticket: string): Promise<boolean> {
    return (await this.cache.deleteKey(WsTicketsService.redisPrefix(ticket))) > 0;
  }
}
