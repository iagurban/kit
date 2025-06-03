import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  override getRequest(context: ExecutionContext) {
    return context.getType<`graphql` /* force */>() === 'graphql'
      ? GqlExecutionContext.create(context).getContext().req
      : super.getRequest(context);
  }
}
