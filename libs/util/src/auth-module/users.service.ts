import { Injectable } from '@nestjs/common';
import { Prisma } from '@poslah/database/generated/db-client/client';

import UserFindManyArgs = Prisma.UserFindManyArgs;
import { DbService } from '@poslah/database/db/db.service';

export type UserSelectPayload<S extends Prisma.UserSelect> = Prisma.UserGetPayload<
  S extends undefined ? undefined : { select: S }
>;

// export type UserInProjectSelectPayload<S extends Prisma.UserInProjectSelect> = Prisma.UserInProjectGetPayload<
//   S extends undefined ? undefined : { select: S }
// >;

@Injectable()
export class UsersService {
  constructor(readonly db: DbService) {}

  async findByUsernameOrEmail<S extends Prisma.UserSelect>(
    nameOrMail: string,
    select?: S
  ): Promise<UserSelectPayload<S>> {
    return ((await this.db.transaction.user.findUnique({ where: { email: nameOrMail }, select })) ||
      (await this.db.transaction.user.findUnique({
        where: { name: nameOrMail },
        select,
      }))) as UserSelectPayload<S>;
  }

  async getUsers<S extends Prisma.UserSelect>(
    where: UserFindManyArgs[`where`],
    select?: S
  ): Promise<UserSelectPayload<S>[]> {
    return (await this.db.transaction.user.findMany({ where, select })) as UserSelectPayload<S>[];
  }

  async createUser<S extends Prisma.UserSelect>(
    name: string,
    email: string,
    abbrev: string,
    passwordHash: string,
    select?: S
  ): Promise<UserSelectPayload<S>> {
    return this.db.inAnyTransaction(async () => {
      const user = await this.db.transaction.user.create({
        data: {
          name,
          email,
          abbrev,
          passwordHash,
          // ownProject: { create: { name: `@personal`, updatedAt: new Date() } },
        },
        select: {
          ...select,
          id: true,
          // ownProjectId: true,
        },
      });

      // await this.db.transaction.userInProject.createMany({
      //   data: Object.values(PermissionInProject).map(p => ({
      //     permission: p,
      //     userId: user.id,
      //     projectId: user.ownProjectId,
      //     level: 100,
      //   })),
      // });

      return user as UserSelectPayload<S>;
    });
  }
}
