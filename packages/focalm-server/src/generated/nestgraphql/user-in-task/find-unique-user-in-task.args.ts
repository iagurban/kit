import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@ArgsType()
export class FindUniqueUserInTaskArgs {
  @Field(() => UserInTaskWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>;
}
