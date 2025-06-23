import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectUpdateInput } from './user-in-project-update.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@ArgsType()
export class UpdateOneUserInProjectArgs {
  @Field(() => UserInProjectUpdateInput, { nullable: false })
  @Type(() => UserInProjectUpdateInput)
  data!: UserInProjectUpdateInput;

  @Field(() => UserInProjectWhereUniqueInput, { nullable: false })
  @Type(() => UserInProjectWhereUniqueInput)
  where!: Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>;
}
