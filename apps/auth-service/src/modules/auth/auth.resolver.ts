import { AuthControllerBase } from '@gurban/kit/nest/auth-controller-base';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';

import { AuthService, CurrentUserJwtPayload, UserWithPassword } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
    this.base = new AuthControllerBase<UserWithPassword, CurrentUserJwtPayload>(authService);
  }

  readonly base: AuthControllerBase<UserWithPassword, CurrentUserJwtPayload>;

  @Mutation(() => String)
  async login(
    @Args('login', { type: () => String }) login: string,
    @Args('password', { type: () => String }) password: string,
    @Context('res') res: Response
  ) {
    return this.base.login(login, password, res);
  }

  @Mutation(() => Boolean)
  async logout(@Context('req') req: Request, @Context('res') res: Response) {
    return this.base.logout(req, res);
  }
}
