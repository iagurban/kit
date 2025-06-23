import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@ArgsType()
export class FindUniqueUserInTaskTagOrThrowArgs {
  @Field(() => UserInTaskTagWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskTagWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_roleId'>;
}
