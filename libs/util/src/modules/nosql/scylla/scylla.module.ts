import { Global, Module } from '@nestjs/common';

import { ScyllaService } from './scylla.service';

@Global()
@Module({
  providers: [ScyllaService.autoconnectionProvider],
  exports: [ScyllaService],
})
export class ScyllaModule {}
