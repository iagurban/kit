import { Injectable } from '@nestjs/common';

import { ServerTimestampInterceptorBase } from './server-timestamp-interceptor-base';

/**
 * An interceptor that injects server-side request timestamps into the response body.
 *
 * This interceptor extends `ServerTimestampInterceptorBase` to add a `__sync` object
 * to the JSON response. The original data from the route handler is merged at the
 * top level of the response body.
 *
 * The `__sync` object contains:
 * - `t1`: The timestamp (in milliseconds since epoch) when the request entered the NestJS pipeline.
 * - `t2`: The timestamp (in milliseconds since epoch) just before the response is sent.
 *
 * This is particularly useful for client-side applications that need to calculate the
 * server time offset or measure the exact request processing duration.
 *
 * @example
 * // If the route handler returns: { "message": "hello" }
 * // The final response body will be:
 * {
 *   "message": "hello",
 *   "__sync": {
 *     "t1": 1672531200000,
 *     "t2": 1672531200100
 *   }
 * }
 */
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
