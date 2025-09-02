import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

/**
 * Base interceptor class for adding server-side timestamp information to request processing.
 * Tracks request timing by adding timestamps at entry and exit points of NestJS request pipeline.
 *
 * Can be used to:
 * - Measure request processing time
 * - Add timing metadata to responses
 * - Server time offset detection on clients
 *
 * @template Intermediate - Type for intermediate data structure between prepare and update steps
 * @template Result - Final type of the processed response
 * @implements {NestInterceptor}
 *
 * @example
 * ```typescript
 * class TimingInterceptor extends ServerTimestampInterceptorBase<
 *   { data: Record<string, string>; entryTime: number },
 *   { data: Record<string, string>; entryTime: number; exitTime: number }
 * > {
 *   prepare(t1: number, data: Record<string, string>) {
 *     return { data, entryTime: t1 };
 *   }
 *
 *   update(o: { data: any; entryTime: number }) {
 *     return { ...o, exitTime: Date.now() };
 *   }
 * }
 * ```
 */
export abstract class ServerTimestampInterceptorBase<Intermediate, Result> implements NestInterceptor {
  /**
   * Prepares intermediate data structure by combining request entry timestamp with response data.
   * Called immediately after receiving response from route handler.
   *
   * @param {number} t1 - Timestamp when request entered NestJS pipeline (milliseconds since epoch)
   * @param {Record<string, string>} data - Response data from route handler
   * @returns {Intermediate} Combined data structure for further processing
   *
   * @example
   * ```typescript
   * // Example #1: Return object with data and entry timestamp
   * prepare(t1: number, data: Record<string, string>) {
   *   return { data, t1 };
   * }
   *
   * // Example #2: Return string prefix with entry timestamp
   * prepare(t1: number) {
   *   return t1.toString() + ':'; // ignore data for precision
   * }
   *
   * // Example #3: Return object with data and entry timestamp in addition meta
   * prepare(t1: number, data: Record<string, string>) {
   *   return { ...data, __timeMetadata: {t1} };
   * }
   * ```
   */
  abstract prepare(t1: number, data: Record<string, string>): Intermediate;

  /**
   * Updates intermediate data with exit timestamp just before sending response.
   * Called at the last possible moment before response is sent to client.
   *
   * @param {Intermediate} o - Intermediate data structure from prepare step
   * @returns {Result} Final response data with timing information
   *
   * @example
   * ```typescript
   * // Example #1: Add exit timestamp to object
   * update(o: { data: any; t1: number }) {
   *   return { ...o, t2: Date.now() }; // result: {data, t1, t2}
   * }
   *
   * // Example #2: Append exit timestamp to string
   * update(o: string) {
   *   return o + Date.now().toString(); // result: `${t1}:${t2}`
   * }
   *
   * // Example #3: Add exit timestamp to object metadata
   * update(o: { data: any; t1: number }) {
   *   return { ...o, __timeMetadata: { ...o.__timeMetadata, t2: Date.now() }}; // result: {...data, __timeMetadata: {t1, t2}}
   * }
   * ```
   */
  abstract update(o: Intermediate): Result;

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // t1 — time when request entering to Nest
    const t1 = Date.now();
    return next.handle().pipe(
      map(
        data => this.update(this.prepare(t1, data)) // add t2 in update() — exit time from Nest (should be the latest operation)
      )
    );
  }
}
