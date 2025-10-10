import { Module } from '@nestjs/common';
import { DbModule } from '@poslah/database/db/db.module';

import { UsersService } from './users.service';

@Module({
  imports: [DbModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
