import { Injectable } from '@nestjs/common';

import { DbClient } from '../db/db.service';

@Injectable()
export class UsersService {
  constructor(readonly db: DbClient) {}

  async findByUsernameOrEmail(nameOrMail: string) {
    return (
      (await this.db.user.findUnique({ where: { email: nameOrMail } })) ||
      (await this.db.user.findUnique({ where: { name: nameOrMail } }))
    );
  }
}
