import { randomBytes } from 'node:crypto';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CookieOptions } from 'express';

import { User } from '../../generated/db-client';
import { DbService } from '../db/db.service';
import { UsersService } from '../users/users.service';

const saltOrRounds = 10;

export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export const hashing = {
  hash: (password: string) => bcrypt.hash(password, saltOrRounds),
  check: (password: string, hash: string) => bcrypt.compare(password, hash),
} as const;

export type CurrentUserJwtPayload = { sub: User[`id`] } & Pick<User, `name` | `email`>;

@Injectable()
export class AuthService {
  constructor(
    readonly usersService: UsersService,
    readonly jwtService: JwtService,
    readonly db: DbService
  ) {}

  async validateUser(nameOrMail: string, pass: string): Promise<Omit<User, `passwordHash`>> {
    const user = await this.usersService.findByUsernameOrEmail(nameOrMail);
    if (!user || !(await hashing.check(pass, user.passwordHash))) {
      throw new UnauthorizedException();
    }
    const { passwordHash: _, ...rest } = user;
    return rest;
  }

  async login(login: string, password: string) {
    const user = await this.validateUser(login, password); // твоя функция

    return this.issueTokens({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
  }

  static readonly accessExpiresIn = '15m';
  static readonly refreshExpiresDays = 7;

  async issueTokens(payload: CurrentUserJwtPayload) {
    const userId = payload.sub;
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: AuthService.accessExpiresIn,
      secret: jwtConstants.secret,
    });

    const tokenValue = randomBytes(32).toString('hex');

    const { id } = await this.db.client.refreshToken.create({
      data: {
        userId,
        hash: await bcrypt.hash(tokenValue, 10),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * AuthService.refreshExpiresDays),
      },
    });

    return { accessToken, refreshToken: `${id}:${tokenValue}` };
  }

  async refresh(compositeToken: string) {
    const [id, rawValue] = compositeToken.split(':');
    if (!id || !rawValue) {
      throw new UnauthorizedException();
    }

    const stored = await this.db.client.refreshToken.findUnique({
      where: { id },
      select: {
        id: true,
        expiresAt: true,
        hash: true,
        user: { select: { id: true, email: true, name: true } },
      },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException();
    }

    if (!(await bcrypt.compare(rawValue, stored.hash))) {
      throw new UnauthorizedException();
    }

    await this.db.client.refreshToken.delete({ where: { id: stored.id } }); // ротация

    const { id: userId, ...restUser } = stored.user;
    return this.issueTokens({ ...restUser, sub: userId }); // новый access + refresh
  }

  async revokeAll(userId: User[`id`]) {
    await this.db.client.refreshToken.deleteMany({ where: { userId } });
  }
}

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 1000 * 60 * 60 * 24 * AuthService.refreshExpiresDays,
};
