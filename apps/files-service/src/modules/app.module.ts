import { Module } from '@nestjs/common';
import { KafkaModule } from '@poslah/database/kafka/kafka.module';
import { rootImports } from '@poslah/util/root-imports';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { S3Service } from './files/s3.service';

@Module({
  imports: [...rootImports, KafkaModule, FilesModule],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
