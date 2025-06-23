import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectCreateInput } from './user-in-project-create.input';
import { UserInProjectUpdateInput } from './user-in-project-update.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@ArgsType()
export class UpsertOneUserInProjectArgs {
  @Field(() => UserInProjectWhereUniqueInput, { nullable: false })
  @Type(() => UserInProjectWhereUniqueInput)
  where!: Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>;

  @Field(() => UserInProjectCreateInput, { nullable: false })
  @Type(() => UserInProjectCreateInput)
  create!: UserInProjectCreateInput;

  @Field(() => UserInProjectUpdateInput, { nullable: false })
  @Type(() => UserInProjectUpdateInput)
  update!: UserInProjectUpdateInput;
}
