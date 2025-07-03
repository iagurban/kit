import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlJwtAuthGuardBase extends AuthGuard('jwt') {
  override getRequest(context: ExecutionContext) {
    return context.getType<`graphql` /* force */>() === 'graphql'
      ? GqlExecutionContext.create(context).getContext().req
      : super.getRequest(context);
  }
}
