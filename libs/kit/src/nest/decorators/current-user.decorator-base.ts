import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { notNull } from '../../utils/flow-utils';

export const getCurrentUserFromExeContext = <CurrentUser>(
  context: ExecutionContext
): CurrentUser | undefined =>
  context.getType<`graphql` /* force */>() === 'graphql'
    ? GqlExecutionContext.create(context).getContext().req?.user
    : (context.switchToHttp().getRequest().user ?? undefined);

export const TryCurrentUserBase = createParamDecorator(<CurrentUser>(_: unknown, context: ExecutionContext) =>
  getCurrentUserFromExeContext<CurrentUser>(context)
);

export const CurrentUserBase = createParamDecorator(<CurrentUser>(_: unknown, context: ExecutionContext) =>
  notNull(getCurrentUserFromExeContext<CurrentUser>(context), 'Unauthorized access: missing req.user')
);
