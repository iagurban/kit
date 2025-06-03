import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { MenusResolver } from './menus.resolver';
import { MenusService } from './menus.service';

@Module({
  imports: [DbModule],
  providers: [MenusService, MenusResolver],
})
export class MenusModule {}
