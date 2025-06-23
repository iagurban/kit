import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagUpdateWithoutRoleInput } from './user-in-task-tag-update-without-role.input';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@InputType()
export class UserInTaskTagUpdateWithWhereUniqueWithoutRoleInput {
  @Field(() => UserInTaskTagWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskTagWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_roleId'>;

  @Field(() => UserInTaskTagUpdateWithoutRoleInput, { nullable: false })
  @Type(() => UserInTaskTagUpdateWithoutRoleInput)
  data!: UserInTaskTagUpdateWithoutRoleInput;
}
