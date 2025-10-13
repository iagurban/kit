import { Module } from '@nestjs/common';

import { TokenFetcherService } from './token-fetcher.service';

@Module({
  providers: [TokenFetcherService],
  exports: [TokenFetcherService],
})
export class TokenFetcherModule {}
