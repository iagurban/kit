import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateWithoutInProjectsInput } from './user-create-without-in-projects.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutInProjectsInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;

  @Field(() => UserCreateWithoutInProjectsInput, { nullable: false })
  @Type(() => UserCreateWithoutInProjectsInput)
  create!: UserCreateWithoutInProjectsInput;
}
