import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbModule } from '@poslah/database/db/db.module';

@Global()
@Module({
  imports: [
    DbModule.forRoot({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        datasourceUrl: config.getOrThrow<string>('DATABASE_URL'),
      }),
    }),
  ],
  exports: [DbModule],
})
export class GlobalDbModule {}
