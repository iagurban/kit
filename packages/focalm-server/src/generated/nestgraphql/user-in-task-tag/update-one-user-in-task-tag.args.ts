import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagUpdateInput } from './user-in-task-tag-update.input';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@ArgsType()
export class UpdateOneUserInTaskTagArgs {
  @Field(() => UserInTaskTagUpdateInput, { nullable: false })
  @Type(() => UserInTaskTagUpdateInput)
  data!: UserInTaskTagUpdateInput;

  @Field(() => UserInTaskTagWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskTagWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_roleId'>;
}
