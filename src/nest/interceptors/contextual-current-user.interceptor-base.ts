import { AsyncLocalStorage } from 'node:async_hooks';

import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { defer, Observable } from 'rxjs';

import { notNull } from '../../utils/flow-utils';
import { getCurrentUserFromExeContext } from '../decorators/current-user.decorator-base';

/**
 * Base class for implementing Nest interceptors that manage user context in AsyncLocalStorage.
 *
 * This interceptor extracts the current user from the execution context and stores it in an
 * AsyncLocalStorage instance specific to the implementing class. This enables access to the
 * current user throughout the request lifecycle without passing it explicitly through parameters.
 *
 * @template CurrentUser - The type representing the user data to be stored in AsyncLocalStorage
 *
 * @example
 * ```typescript
 * @Injectable()
 * class UserContextInterceptor extends ContextualCurrentUserInterceptorBase<User> {
 *   private static storage = new AsyncLocalStorage<User>();
 *
 *   getStorage() {
 *     return UserContextInterceptor.storage;
 *   }
 * }
 * ```
 *
 * @implements {NestInterceptor}
 */
export abstract class ContextualCurrentUserInterceptorBase<CurrentUser> implements NestInterceptor {
  /**
   * Abstract method that must be implemented by subclasses to provide the AsyncLocalStorage
   * instance where the current user data should be stored.
   *
   * @returns {AsyncLocalStorage<CurrentUser>} The storage instance for the current user
   */
  abstract getStorage(): AsyncLocalStorage<CurrentUser>;

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const user = notNull(getCurrentUserFromExeContext<CurrentUser>(context));
    // console.log(`interceptor:`, user);
    return defer(() => this.getStorage().run(user, () => next.handle()));
  }
}
