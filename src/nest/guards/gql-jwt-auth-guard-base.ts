import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * A JWT authentication guard for GraphQL requests.
 */
export class GqlJwtAuthGuardBase extends AuthGuard('jwt') {
  /**
   * Gets the request object from the execution context.
   * @param context The execution context.
   * @returns The request object.
   */
  override getRequest(context: ExecutionContext) {
    return context.getType<`graphql` /* force */>() === 'graphql'
      ? GqlExecutionContext.create(context).getContext().req
      : super.getRequest(context);
  }
}
