import { notNull } from '@gurban/kit/utils/flow-utils';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { defer, Observable } from 'rxjs';

import { getCurrentUserFromExeContext } from '../decorators/current-user';
import { currentUserCtx } from './current-user-context';

@Injectable()
export class ContextualCurrentUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const user = notNull(getCurrentUserFromExeContext(context));
    // console.log(`interceptor:`, user);
    return defer(() => currentUserCtx.__storage.run(user, () => next.handle()));
  }
}
