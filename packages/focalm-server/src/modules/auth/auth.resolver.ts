import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';

import { AuthService, refreshTokenCookieOptions } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('login') login: string,
    @Args('password') password: string,
    @Context('req') req: Request,
    @Context('res') res: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.login(login, password);

    res.cookie('refresh_token', refreshToken, refreshTokenCookieOptions);

    return accessToken;
  }

  @Mutation(() => Boolean)
  async logout(@Context('req') req: Request, @Context('res') res: Response) {
    const oldRefresh = req.cookies['refresh_token'];
    if (oldRefresh) {
      await this.authService.refresh(oldRefresh);
    } // она удалит токен
    res.clearCookie('refresh_token');
    return true;
  }
}
