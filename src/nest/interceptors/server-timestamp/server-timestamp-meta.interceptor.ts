import { Injectable } from '@nestjs/common';

import { ServerTimestampInterceptorBase } from './server-timestamp-interceptor-base';

@Injectable()
export class ServerTimestampMetaInterceptor extends ServerTimestampInterceptorBase<
  { __sync: { t1: number } },
  { __sync: { t1: number; t2: number } }
> {
  prepare(t1: number, data: Record<string, string>) {
    return { ...data, __sync: { t1 } };
  }

  update(o: { __sync: { t1: number } }) {
    return { ...o, __sync: { ...o.__sync, t2: Date.now() } };
  }
}
