import { AsyncLocalStorage } from 'node:async_hooks';

import { ContextualCurrentUserInterceptorBase } from '@gurban/kit/nest/interceptors/contextual-current-user.interceptor-base';
import { Injectable } from '@nestjs/common';

import { AppUser } from '../modules/auth-module/auth.types';

const storage = new AsyncLocalStorage<AppUser>();

@Injectable()
class UserContextInterceptor extends ContextualCurrentUserInterceptorBase<AppUser> {
  getStorage() {
    return storage;
  }
}

export const getCurrentUser = () => storage.getStore();
