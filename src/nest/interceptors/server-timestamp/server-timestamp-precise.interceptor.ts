import { Injectable } from '@nestjs/common';

import { ServerTimestampInterceptorBase } from './server-timestamp-interceptor-base';

/**
 * Warning: this interceptor ignores results of operation and returns only "12345:12345" string in any case
 */
@Injectable()
export class ServerTimestampPreciseInterceptor extends ServerTimestampInterceptorBase<string, string> {
  prepare(t1: number) {
    return t1.toString() + `:`;
  }

  update(o: string): string {
    return o + Date.now().toString();
  }
}
