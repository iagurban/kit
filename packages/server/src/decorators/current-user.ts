import { notNull } from '@freyja/kit';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import type { User } from '../generated/db-client';

export type CurrentUser = Pick<User, 'id' | 'name' | 'email'>;

const getCurrentUser = (context: ExecutionContext): CurrentUser | undefined =>
  (context.getType<`graphql` /* force */>() === 'graphql'
    ? GqlExecutionContext.create(context).getContext().req
    : context.switchToHttp().getRequest()
  ).user ?? undefined;

export const TryCurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) =>
  getCurrentUser(context)
);

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) =>
  notNull(getCurrentUser(context), 'Unauthorized access: missing req.user')
);
