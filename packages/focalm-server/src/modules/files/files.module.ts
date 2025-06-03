import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { UsersModule } from '../users/users.module';
import { FilesController } from './files.controller';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';

@Module({
  imports: [DbModule, UsersModule],
  providers: [FilesService, FilesResolver],
  controllers: [FilesController],
})
export class FilesModule {}
