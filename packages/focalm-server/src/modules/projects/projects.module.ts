import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { UsersModule } from '../users/users.module';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  imports: [DbModule, UsersModule],
  providers: [ProjectsResolver, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
