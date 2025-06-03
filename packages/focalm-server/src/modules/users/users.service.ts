import { AsyncLocalStorage } from 'node:async_hooks';

import { notNull } from '@freyja/kit/src';
import { Injectable } from '@nestjs/common';

import { CurrentUser } from '../../decorators/current-user';
import { DbService } from '../db/db.service';

@Injectable()
export class UsersService {
  constructor(readonly db: DbService) {}

  async findByUsernameOrEmail(nameOrMail: string) {
    return (
      (await this.db.client.user.findUnique({ where: { email: nameOrMail } })) ||
      (await this.db.client.user.findUnique({ where: { name: nameOrMail } }))
    );
  }

  private readonly currentUserStorage = new AsyncLocalStorage<CurrentUser>();

  get contextUser() {
    return notNull(this.maybeContextUser);
  }

  get maybeContextUser() {
    return this.currentUserStorage.getStore();
  }

  withContextUser<T>(user: CurrentUser, fn: () => Promise<T>, allowNested = false): Promise<T> {
    if (!allowNested && this.maybeContextUser) {
      throw new Error(`Nesting context users are not allowed`);
    }
    return this.currentUserStorage.run(user, fn);
  }
}
