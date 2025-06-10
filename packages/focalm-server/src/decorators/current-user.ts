import { notNull } from '@freyja/kit/src';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import type { User } from '../generated/db-client';

export type CurrentUser = Pick<User, 'id' | 'name' | 'email'>;

export const getCurrentUserFromExeContext = (context: ExecutionContext): CurrentUser | undefined =>
  (context.getType<`graphql` /* force */>() === 'graphql'
    ? GqlExecutionContext.create(context).getContext().req
    : context.switchToHttp().getRequest()
  ).user ?? undefined;

export const TryCurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) =>
  getCurrentUserFromExeContext(context)
);

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) =>
  notNull(getCurrentUserFromExeContext(context), 'Unauthorized access: missing req.user')
);
