import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskUpdateInput } from './user-in-task-update.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@ArgsType()
export class UpdateOneUserInTaskArgs {
  @Field(() => UserInTaskUpdateInput, { nullable: false })
  @Type(() => UserInTaskUpdateInput)
  data!: UserInTaskUpdateInput;

  @Field(() => UserInTaskWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>;
}
