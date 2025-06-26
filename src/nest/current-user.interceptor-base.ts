import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { defer, Observable } from 'rxjs';

import { notNull } from '../utils/flow-utils';
import { getCurrentUserFromExeContext } from './current-user.decorator-base';

export abstract class CurrentUserInterceptorBase<CurrentUser> implements NestInterceptor {
  abstract run(fn: () => Observable<unknown>, user: CurrentUser): Observable<unknown>;

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const user = notNull(getCurrentUserFromExeContext<CurrentUser>(context));
    // console.log(`interceptor:`, user);
    return defer(() => this.run(() => next.handle(), user));
  }
}
