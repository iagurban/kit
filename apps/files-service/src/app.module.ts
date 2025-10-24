import { Module } from '@nestjs/common';
import { GlobalDbModule } from '@poslah/util/ready-modules/global-db-module';
import { rootImports } from '@poslah/util/root-imports';

import { FilesModule } from './files-module/files.module';

@Module({
  imports: [...rootImports, GlobalDbModule, FilesModule],
})
export class AppModule {}
