import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { User } from '../db-client.generated';
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

@Injectable()
export class AuthService {
  constructor(
    readonly usersService: UsersService,
    readonly jwtService: JwtService
  ) {}

  async validateUser(nameOrMail: string, pass: string): Promise<Omit<User, `passwordHash`>> {
    const user = await this.usersService.findByUsernameOrEmail(nameOrMail);
    if (!user || !(await hashing.check(pass, user.passwordHash))) {
      throw new UnauthorizedException();
    }
    const { passwordHash, ...rest } = user;
    return rest;
  }

  async login(user: Omit<User, `passwordHash`>) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
