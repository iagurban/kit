import { Module } from '@nestjs/common';

import { ScyllaService } from './scylla.service';

@Module({
  providers: [ScyllaService.autoconnectionProvider],
  exports: [ScyllaService],
})
export class ScyllaModule {}
