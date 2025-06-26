import { randomBytes } from 'node:crypto';

import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CookieOptions } from 'express';

const saltOrRounds = 10;

export const hashing = {
  hash: (password: string) => bcrypt.hash(password, saltOrRounds),
  check: (password: string, hash: string) => bcrypt.compare(password, hash),
} as const;

export abstract class AuthServiceBase<
  User extends { id: string; passwordHash: string },
  CurrentUserJwtPayload extends { sub: string },
> {
  protected constructor(
    readonly jwtService: JwtService,
    readonly refreshCookieOptions: {
      cookieSecret: string;
      accessExpiresIn: string | number;
      refreshExpiresDays: number;
    }
  ) {}

  abstract findByUsernameOrEmail(nameOrMail: string): Promise<User | null>;

  abstract saveRefreshToken(userId: string, hash: string, expiresAt: Date): Promise<string>;

  abstract findRefreshToken(
    id: string
  ): Promise<{ id: string; expiresAt: Date; hash: string; user: Omit<User, `passwordHash`> } | null>;

  abstract deleteRefreshToken(id: string): Promise<void>;

  abstract deleteRefreshTokensOfUser(userId: string): Promise<void>;

  abstract userToPayload(user: Omit<User, `passwordHash`>): CurrentUserJwtPayload;

  async validateUser(nameOrMail: string, pass: string): Promise<Omit<User, `passwordHash`>> {
    const user = await this.findByUsernameOrEmail(nameOrMail);
    if (!user || !(await hashing.check(pass, user.passwordHash))) {
      throw new UnauthorizedException();
    }
    const { passwordHash: _, ...rest } = user;
    return rest;
  }

  async login(login: string, password: string) {
    const user = await this.validateUser(login, password); // твоя функция

    return this.issueTokens(user);
  }

  async issueTokens(user: Omit<User, `passwordHash`>) {
    const payload: CurrentUserJwtPayload = this.userToPayload(user);
    const userId = payload.sub;
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.refreshCookieOptions.accessExpiresIn,
      secret: this.refreshCookieOptions.cookieSecret,
    });

    const tokenValue = randomBytes(32).toString('hex');

    const id = await this.saveRefreshToken(
      userId,
      await bcrypt.hash(tokenValue, 10),
      new Date(Date.now() + 1000 * 60 * 60 * 24 * this.refreshCookieOptions.refreshExpiresDays)
    );

    return { accessToken, refreshToken: `${id}:${tokenValue}` };
  }

  async refresh(compositeToken: string) {
    const [id, rawValue] = compositeToken.split(':');
    if (!id || !rawValue) {
      throw new UnauthorizedException();
    }

    const stored = await this.findRefreshToken(id);

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(rawValue, stored.hash))) {
      throw new UnauthorizedException();
    }

    await this.deleteRefreshToken(stored.id); // ротация

    return this.issueTokens(stored.user); // новый access + refresh
  }

  async revokeAll(userId: User[`id`]) {
    await this.deleteRefreshTokensOfUser(userId);
  }

  get refreshTokenCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * this.refreshCookieOptions.refreshExpiresDays,
    };
  }
}
