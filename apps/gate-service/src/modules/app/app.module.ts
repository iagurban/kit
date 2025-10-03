import { Module } from '@nestjs/common';
import { rootImports } from '@poslah/util/root-imports';

import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [...rootImports, GatewayModule],
})
export class AppModule {}
