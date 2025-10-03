import { ContextualCurrentUserInterceptorBase } from '@gurban/kit/nest/interceptors/contextual-current-user.interceptor-base';
import { Injectable } from '@nestjs/common';

import { CurrentUser } from '../decorators/current-user';
import { currentUserCtx } from '../shared';

@Injectable()
export class ContextualCurrentUserInterceptor extends ContextualCurrentUserInterceptorBase<CurrentUser> {
  getStorage() {
    return currentUserCtx.__storage;
  }
}
