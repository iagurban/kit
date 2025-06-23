import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectCreateManyUserInputEnvelope } from './user-in-project-create-many-user-input-envelope.input';
import { UserInProjectCreateOrConnectWithoutUserInput } from './user-in-project-create-or-connect-without-user.input';
import { UserInProjectCreateWithoutUserInput } from './user-in-project-create-without-user.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@InputType()
export class UserInProjectCreateNestedManyWithoutUserInput {
  @Field(() => [UserInProjectCreateWithoutUserInput], { nullable: true })
  @Type(() => UserInProjectCreateWithoutUserInput)
  create?: Array<UserInProjectCreateWithoutUserInput>;

  @Field(() => [UserInProjectCreateOrConnectWithoutUserInput], { nullable: true })
  @Type(() => UserInProjectCreateOrConnectWithoutUserInput)
  connectOrCreate?: Array<UserInProjectCreateOrConnectWithoutUserInput>;

  @Field(() => UserInProjectCreateManyUserInputEnvelope, { nullable: true })
  @Type(() => UserInProjectCreateManyUserInputEnvelope)
  createMany?: UserInProjectCreateManyUserInputEnvelope;

  @Field(() => [UserInProjectWhereUniqueInput], { nullable: true })
  @Type(() => UserInProjectWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>>;
}
