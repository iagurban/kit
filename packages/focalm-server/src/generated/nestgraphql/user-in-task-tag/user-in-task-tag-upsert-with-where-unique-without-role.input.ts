import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagCreateWithoutRoleInput } from './user-in-task-tag-create-without-role.input';
import { UserInTaskTagUpdateWithoutRoleInput } from './user-in-task-tag-update-without-role.input';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@InputType()
export class UserInTaskTagUpsertWithWhereUniqueWithoutRoleInput {
  @Field(() => UserInTaskTagWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskTagWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_roleId'>;

  @Field(() => UserInTaskTagUpdateWithoutRoleInput, { nullable: false })
  @Type(() => UserInTaskTagUpdateWithoutRoleInput)
  update!: UserInTaskTagUpdateWithoutRoleInput;

  @Field(() => UserInTaskTagCreateWithoutRoleInput, { nullable: false })
  @Type(() => UserInTaskTagCreateWithoutRoleInput)
  create!: UserInTaskTagCreateWithoutRoleInput;
}
