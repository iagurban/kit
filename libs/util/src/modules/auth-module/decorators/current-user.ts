import { CurrentUserBase, TryCurrentUserBase } from '@gurban/kit/nest/decorators/current-user.decorator-base';
import type { User } from '@poslah/database/generated/db-client/client';

export type CurrentUser = Pick<User, 'id' | 'name' | 'email'>;

export const CurrentUser = (...data: unknown[]) => CurrentUserBase<CurrentUser>(...data);
export const TryCurrentUser = (...data: unknown[]) => TryCurrentUserBase<CurrentUser>(...data);
