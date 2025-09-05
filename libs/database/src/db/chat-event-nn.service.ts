import { Injectable } from '@nestjs/common';

import { DbService } from './db.service';

@Injectable()
export class ChatEventNNService {
  constructor(private readonly db: DbService) {}

  /**
   * Атомарно получает следующее значение из глобальной последовательности обновлений.
   * @returns {Promise<bigint>} Следующий event_nn (порядковый номер события) в формате bigint.
   */
  async popNextEventNn(): Promise<bigint> {
    return (
      await this.db.transaction.$queryRaw<[{ nextval: bigint }]>`SELECT nextval('global_update_sequence');`
    )[0].nextval;
  }
}
