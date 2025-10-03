import { AuthServiceBase } from '@gurban/kit/nest/auth-service-base';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DbService } from '@poslah/database/db/db.service';
import { User } from '@poslah/database/generated/db-client/client';

import { UsersService } from '../users/users.service';

type ExposedUserPart = Pick<User, `name` | `email`>;

export type CurrentUserJwtPayload = { sub: User[`id`] } & ExposedUserPart;
export type UserWithPassword = Pick<User, `id` | `passwordHash`> & ExposedUserPart;

@Injectable()
export class AuthService extends AuthServiceBase<UserWithPassword, CurrentUserJwtPayload> {
  constructor(
    readonly usersService: UsersService,
    jwtService: JwtService,
    readonly db: DbService,
    readonly configService: ConfigService
  ) {
    super(jwtService, {
      cookieSecret: configService.getOrThrow(`cookieSecret`),
      accessExpiresIn: configService.getOrThrow<string | number>(`accessExpiresIn`),
      refreshExpiresDays: configService.getOrThrow<number>(`refreshExpiresDays`),
    });
  }

  override userToPayload(user: User): CurrentUserJwtPayload {
    const { id: userId, ...restUser } = user;
    return { ...restUser, sub: userId };
  }

  async findByUsernameOrEmail(nameOrMail: string): Promise<UserWithPassword | null> {
    return this.usersService.findByUsernameOrEmail(nameOrMail, {
      id: true,
      email: true,
      name: true,
      passwordHash: true,
    });
  }

  async findRefreshToken(id: string) {
    // console.log(`finding refresh token id: ${id}`);
    return this.db.transaction.refreshToken.findUnique({
      where: { id },
      select: {
        id: true,
        expiresAt: true,
        hash: true,
        user: { select: { id: true, email: true, name: true } },
      },
    });
  }

  async saveRefreshToken(userId: User[`id`], hash: string, expiresAt: Date): Promise<string> {
    const id = (
      await this.db.transaction.refreshToken.create({
        data: { userId, hash, expiresAt },
        select: { id: true },
      })
    ).id;

    // console.log(`saving refresh ${id} for ${userId}`);

    return id;
  }

  async deleteRefreshToken(id: string) {
    // console.log(`deleting refresh token id: ${id}`);
    await this.db.transaction.refreshToken.delete({ where: { id } });
  }

  async deleteRefreshTokensOfUser(userId: string) {
    await this.db.transaction.refreshToken.deleteMany({ where: { userId } });
  }
}
