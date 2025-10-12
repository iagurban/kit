import { DynamicModule, Module } from '@nestjs/common';

import { DynamicModuleFabric } from '../dynamic-module-fabric';
import { DbService, DbServiceConfig, dbServiceConfigToken } from './db.service';

@Module({})
export class DbModule {
  static forRoot(options: DynamicModuleFabric<DbServiceConfig>): DynamicModule {
    return {
      module: DbModule,
      imports: options.imports,
      providers: [
        {
          provide: dbServiceConfigToken,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        DbService,
      ],
      exports: [DbService],
      global: options.global,
    };
  }
}
