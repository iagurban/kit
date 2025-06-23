import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectCreateManyProjectInputEnvelope } from './user-in-project-create-many-project-input-envelope.input';
import { UserInProjectCreateOrConnectWithoutProjectInput } from './user-in-project-create-or-connect-without-project.input';
import { UserInProjectCreateWithoutProjectInput } from './user-in-project-create-without-project.input';
import { UserInProjectScalarWhereInput } from './user-in-project-scalar-where.input';
import { UserInProjectUpdateManyWithWhereWithoutProjectInput } from './user-in-project-update-many-with-where-without-project.input';
import { UserInProjectUpdateWithWhereUniqueWithoutProjectInput } from './user-in-project-update-with-where-unique-without-project.input';
import { UserInProjectUpsertWithWhereUniqueWithoutProjectInput } from './user-in-project-upsert-with-where-unique-without-project.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@InputType()
export class UserInProjectUncheckedUpdateManyWithoutProjectNestedInput {
  @Field(() => [UserInProjectCreateWithoutProjectInput], { nullable: true })
  @Type(() => UserInProjectCreateWithoutProjectInput)
  create?: Array<UserInProjectCreateWithoutProjectInput>;

  @Field(() => [UserInProjectCreateOrConnectWithoutProjectInput], { nullable: true })
  @Type(() => UserInProjectCreateOrConnectWithoutProjectInput)
  connectOrCreate?: Array<UserInProjectCreateOrConnectWithoutProjectInput>;

  @Field(() => [UserInProjectUpsertWithWhereUniqueWithoutProjectInput], { nullable: true })
  @Type(() => UserInProjectUpsertWithWhereUniqueWithoutProjectInput)
  upsert?: Array<UserInProjectUpsertWithWhereUniqueWithoutProjectInput>;

  @Field(() => UserInProjectCreateManyProjectInputEnvelope, { nullable: true })
  @Type(() => UserInProjectCreateManyProjectInputEnvelope)
  createMany?: UserInProjectCreateManyProjectInputEnvelope;

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

  @Field(() => [UserInProjectUpdateWithWhereUniqueWithoutProjectInput], { nullable: true })
  @Type(() => UserInProjectUpdateWithWhereUniqueWithoutProjectInput)
  update?: Array<UserInProjectUpdateWithWhereUniqueWithoutProjectInput>;

  @Field(() => [UserInProjectUpdateManyWithWhereWithoutProjectInput], { nullable: true })
  @Type(() => UserInProjectUpdateManyWithWhereWithoutProjectInput)
  updateMany?: Array<UserInProjectUpdateManyWithWhereWithoutProjectInput>;

  @Field(() => [UserInProjectScalarWhereInput], { nullable: true })
  @Type(() => UserInProjectScalarWhereInput)
  deleteMany?: Array<UserInProjectScalarWhereInput>;
}
