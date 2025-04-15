import { Module } from '@nestjs/common';

import { DbClient, DbService } from './db.service';

@Module({
  providers: [DbClient, DbService],
  exports: [DbClient, DbService],
})
export class DbModule {}
