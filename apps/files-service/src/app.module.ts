import { Module } from '@nestjs/common';
import { GraphqlSubgraphModule } from '@poslah/util/modules/graphql-subgraph/graphql-subgraph.module';
import { GlobalDbModule } from '@poslah/util/ready-modules/global-db-module';
import { rootImports } from '@poslah/util/root-imports';

import buildInfo from './build-info.json';
import { FilesModule } from './files-module/files.module';

@Module({
  imports: [
    ...rootImports(`files-service`, `files`),
    GlobalDbModule,
    GraphqlSubgraphModule.forRootAsync(buildInfo.buildTime),
    // registerGRPCClientsModule([signingGRPCConfig, chatsGRPCConfig]),

    FilesModule,
  ],
})
export class AppModule {}
