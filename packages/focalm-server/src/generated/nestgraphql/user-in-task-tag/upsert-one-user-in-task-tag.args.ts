import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagCreateInput } from './user-in-task-tag-create.input';
import { UserInTaskTagUpdateInput } from './user-in-task-tag-update.input';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@ArgsType()
export class UpsertOneUserInTaskTagArgs {
  @Field(() => UserInTaskTagWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskTagWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_tag'>;

  @Field(() => UserInTaskTagCreateInput, { nullable: false })
  @Type(() => UserInTaskTagCreateInput)
  create!: UserInTaskTagCreateInput;

  @Field(() => UserInTaskTagUpdateInput, { nullable: false })
  @Type(() => UserInTaskTagUpdateInput)
  update!: UserInTaskTagUpdateInput;
}
