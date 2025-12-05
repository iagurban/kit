import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { notNull } from '../../core';

/**
 * Extracts the current user from the execution context.
 * @param context The execution context.
 * @returns The current user, or undefined if not found.
 */
export const getCurrentUserFromExeContext = <CurrentUser>(
  context: ExecutionContext
): CurrentUser | undefined =>
  context.getType<`graphql` /* force */>() === 'graphql'
    ? GqlExecutionContext.create(context).getContext().req?.user
    : (context.switchToHttp().getRequest().user ?? undefined);

/**
 * A decorator that extracts the current user from the execution context.
 * If the user is not found, it returns undefined.
 */
export const TryCurrentUserBase = createParamDecorator(<CurrentUser>(_: unknown, context: ExecutionContext) =>
  getCurrentUserFromExeContext<CurrentUser>(context)
);

/**
 * A decorator that extracts the current user from the execution context.
 * If the user is not found, it throws an error.
 */
export const CurrentUserBase = createParamDecorator(<CurrentUser>(_: unknown, context: ExecutionContext) =>
  notNull(getCurrentUserFromExeContext<CurrentUser>(context), 'Unauthorized access: missing req.user')
);
