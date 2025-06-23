import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectCreateManyUserInputEnvelope } from './user-in-project-create-many-user-input-envelope.input';
import { UserInProjectCreateOrConnectWithoutUserInput } from './user-in-project-create-or-connect-without-user.input';
import { UserInProjectCreateWithoutUserInput } from './user-in-project-create-without-user.input';
import { UserInProjectScalarWhereInput } from './user-in-project-scalar-where.input';
import { UserInProjectUpdateManyWithWhereWithoutUserInput } from './user-in-project-update-many-with-where-without-user.input';
import { UserInProjectUpdateWithWhereUniqueWithoutUserInput } from './user-in-project-update-with-where-unique-without-user.input';
import { UserInProjectUpsertWithWhereUniqueWithoutUserInput } from './user-in-project-upsert-with-where-unique-without-user.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@InputType()
export class UserInProjectUpdateManyWithoutUserNestedInput {
  @Field(() => [UserInProjectCreateWithoutUserInput], { nullable: true })
  @Type(() => UserInProjectCreateWithoutUserInput)
  create?: Array<UserInProjectCreateWithoutUserInput>;

  @Field(() => [UserInProjectCreateOrConnectWithoutUserInput], { nullable: true })
  @Type(() => UserInProjectCreateOrConnectWithoutUserInput)
  connectOrCreate?: Array<UserInProjectCreateOrConnectWithoutUserInput>;

  @Field(() => [UserInProjectUpsertWithWhereUniqueWithoutUserInput], { nullable: true })
  @Type(() => UserInProjectUpsertWithWhereUniqueWithoutUserInput)
  upsert?: Array<UserInProjectUpsertWithWhereUniqueWithoutUserInput>;

  @Field(() => UserInProjectCreateManyUserInputEnvelope, { nullable: true })
  @Type(() => UserInProjectCreateManyUserInputEnvelope)
  createMany?: UserInProjectCreateManyUserInputEnvelope;

  @Field(() => [UserInProjectWhereUniqueInput], { nullable: true })
  @Type(() => UserInProjectWhereUniqueInput)
  set?: Array<Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>>;

  @Field(() => [UserInProjectWhereUniqueInput], { nullable: true })
  @Type(() => UserInProjectWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>>;

  @Field(() => [UserInProjectWhereUniqueInput], { nullable: true })
  @Type(() => UserInProjectWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>>;

  @Field(() => [UserInProjectWhereUniqueInput], { nullable: true })
  @Type(() => UserInProjectWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>>;

  @Field(() => [UserInProjectUpdateWithWhereUniqueWithoutUserInput], { nullable: true })
  @Type(() => UserInProjectUpdateWithWhereUniqueWithoutUserInput)
  update?: Array<UserInProjectUpdateWithWhereUniqueWithoutUserInput>;

  @Field(() => [UserInProjectUpdateManyWithWhereWithoutUserInput], { nullable: true })
  @Type(() => UserInProjectUpdateManyWithWhereWithoutUserInput)
  updateMany?: Array<UserInProjectUpdateManyWithWhereWithoutUserInput>;

  @Field(() => [UserInProjectScalarWhereInput], { nullable: true })
  @Type(() => UserInProjectScalarWhereInput)
  deleteMany?: Array<UserInProjectScalarWhereInput>;
}
