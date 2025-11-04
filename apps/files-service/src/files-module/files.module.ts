import { Module } from '@nestjs/common';
import { CacheModule } from '@poslah/util/modules/cache/cache.module';
import { RedisStaticModule } from '@poslah/util/ready-modules/redis-static-module';

import { FilesRepository } from './files.repository';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';
import { S3Service } from './s3.service';

@Module({
  imports: [RedisStaticModule, CacheModule],
  providers: [FilesService, FilesRepository, S3Service, FilesResolver],
})
export class FilesModule {}
