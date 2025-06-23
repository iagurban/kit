import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@ArgsType()
export class FindUniqueUserInProjectArgs {
  @Field(() => UserInProjectWhereUniqueInput, { nullable: false })
  @Type(() => UserInProjectWhereUniqueInput)
  where!: Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>;
}
