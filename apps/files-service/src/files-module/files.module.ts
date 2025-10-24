import { Module } from '@nestjs/common';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';
import { S3Service } from './s3.service';

@Module({
  imports: [RedisStaticModule],
  providers: [FilesService, S3Service, FilesResolver],
})
export class FilesModule {}
