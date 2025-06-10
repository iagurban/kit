import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { UsersModule } from '../users/users.module';
import { TasksResolver, TasksUpdateResultResolver, TasksWithRelatedStuffResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [DbModule, UsersModule],
  providers: [TasksService, TasksResolver, TasksUpdateResultResolver, TasksWithRelatedStuffResolver],
})
export class TasksModule {}
