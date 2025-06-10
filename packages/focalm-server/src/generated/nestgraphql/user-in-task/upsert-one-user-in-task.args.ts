import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskCreateInput } from './user-in-task-create.input';
import { UserInTaskUpdateInput } from './user-in-task-update.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@ArgsType()
export class UpsertOneUserInTaskArgs {
  @Field(() => UserInTaskWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>;

  @Field(() => UserInTaskCreateInput, { nullable: false })
  @Type(() => UserInTaskCreateInput)
  create!: UserInTaskCreateInput;

  @Field(() => UserInTaskUpdateInput, { nullable: false })
  @Type(() => UserInTaskUpdateInput)
  update!: UserInTaskUpdateInput;
}
