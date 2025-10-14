import { Module } from '@nestjs/common';

import { TokenCheckerService } from './token-checker.service';

@Module({
  providers: [TokenCheckerService],
  exports: [TokenCheckerService],
})
export class TokenCheckerModule {}
