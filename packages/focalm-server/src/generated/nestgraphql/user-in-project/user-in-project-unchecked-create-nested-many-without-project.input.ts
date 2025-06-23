import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectCreateManyProjectInputEnvelope } from './user-in-project-create-many-project-input-envelope.input';
import { UserInProjectCreateOrConnectWithoutProjectInput } from './user-in-project-create-or-connect-without-project.input';
import { UserInProjectCreateWithoutProjectInput } from './user-in-project-create-without-project.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@InputType()
export class UserInProjectUncheckedCreateNestedManyWithoutProjectInput {
  @Field(() => [UserInProjectCreateWithoutProjectInput], { nullable: true })
  @Type(() => UserInProjectCreateWithoutProjectInput)
  create?: Array<UserInProjectCreateWithoutProjectInput>;

  @Field(() => [UserInProjectCreateOrConnectWithoutProjectInput], { nullable: true })
  @Type(() => UserInProjectCreateOrConnectWithoutProjectInput)
  connectOrCreate?: Array<UserInProjectCreateOrConnectWithoutProjectInput>;

  @Field(() => UserInProjectCreateManyProjectInputEnvelope, { nullable: true })
  @Type(() => UserInProjectCreateManyProjectInputEnvelope)
  createMany?: UserInProjectCreateManyProjectInputEnvelope;

  @Field(() => [UserInProjectWhereUniqueInput], { nullable: true })
  @Type(() => UserInProjectWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>>;
}
