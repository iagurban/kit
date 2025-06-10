import { Injectable } from '@nestjs/common';

import { Prisma } from '../../generated/db-client';
import { DbService } from '../db/db.service';
import UserFindManyArgs = Prisma.UserFindManyArgs;

@Injectable()
export class UsersService {
  constructor(readonly db: DbService) {}

  async findByUsernameOrEmail(nameOrMail: string) {
    return (
      (await this.db.client.user.findUnique({ where: { email: nameOrMail } })) ||
      (await this.db.client.user.findUnique({ where: { name: nameOrMail } }))
    );
  }

  getUsers(arg: UserFindManyArgs) {
    return this.db.transaction.user.findMany(arg);
  }
}
