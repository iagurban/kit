import { Injectable } from '@nestjs/common';

import { ServerTimestampInterceptorBase } from './server-timestamp-interceptor-base';

/**
 * An interceptor that replaces the entire response body with a string containing server-side request timestamps.
 *
 * @warning This interceptor completely ignores and discards the data returned from the route handler.
 * The response body will *always* be a string in the format "t1:t2".
 *
 * The returned string contains:
 * - `t1`: The timestamp (in milliseconds since epoch) when the request entered the NestJS pipeline.
 * - `t2`: The timestamp (in milliseconds since epoch) just before the response is sent.
 *
 * This interceptor is designed for use cases where only the precise server-side timing is required,
 * such as client-side time synchronization, and the original response data is not needed.
 *
 * @example
 * // Regardless of what the route handler returns, the final response body will be a string like:
 * // "1672531200000:1672531200100"
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
