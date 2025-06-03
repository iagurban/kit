import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { UsersModule } from '../users/users.module';
import { TasksResolver, TasksUpdateResultResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  imports: [DbModule, UsersModule],
  providers: [TasksService, TasksResolver, TasksUpdateResultResolver],
})
export class TasksModule {}
