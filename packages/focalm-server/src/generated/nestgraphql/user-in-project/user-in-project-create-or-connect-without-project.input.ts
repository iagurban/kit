import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectCreateWithoutProjectInput } from './user-in-project-create-without-project.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@InputType()
export class UserInProjectCreateOrConnectWithoutProjectInput {
  @Field(() => UserInProjectWhereUniqueInput, { nullable: false })
  @Type(() => UserInProjectWhereUniqueInput)
  where!: Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>;

  @Field(() => UserInProjectCreateWithoutProjectInput, { nullable: false })
  @Type(() => UserInProjectCreateWithoutProjectInput)
  create!: UserInProjectCreateWithoutProjectInput;
}
