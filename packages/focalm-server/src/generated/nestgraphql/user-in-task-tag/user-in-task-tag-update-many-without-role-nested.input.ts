import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagCreateManyRoleInputEnvelope } from './user-in-task-tag-create-many-role-input-envelope.input';
import { UserInTaskTagCreateOrConnectWithoutRoleInput } from './user-in-task-tag-create-or-connect-without-role.input';
import { UserInTaskTagCreateWithoutRoleInput } from './user-in-task-tag-create-without-role.input';
import { UserInTaskTagScalarWhereInput } from './user-in-task-tag-scalar-where.input';
import { UserInTaskTagUpdateManyWithWhereWithoutRoleInput } from './user-in-task-tag-update-many-with-where-without-role.input';
import { UserInTaskTagUpdateWithWhereUniqueWithoutRoleInput } from './user-in-task-tag-update-with-where-unique-without-role.input';
import { UserInTaskTagUpsertWithWhereUniqueWithoutRoleInput } from './user-in-task-tag-upsert-with-where-unique-without-role.input';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@InputType()
export class UserInTaskTagUpdateManyWithoutRoleNestedInput {
  @Field(() => [UserInTaskTagCreateWithoutRoleInput], { nullable: true })
  @Type(() => UserInTaskTagCreateWithoutRoleInput)
  create?: Array<UserInTaskTagCreateWithoutRoleInput>;

  @Field(() => [UserInTaskTagCreateOrConnectWithoutRoleInput], { nullable: true })
  @Type(() => UserInTaskTagCreateOrConnectWithoutRoleInput)
  connectOrCreate?: Array<UserInTaskTagCreateOrConnectWithoutRoleInput>;

  @Field(() => [UserInTaskTagUpsertWithWhereUniqueWithoutRoleInput], { nullable: true })
  @Type(() => UserInTaskTagUpsertWithWhereUniqueWithoutRoleInput)
  upsert?: Array<UserInTaskTagUpsertWithWhereUniqueWithoutRoleInput>;

  @Field(() => UserInTaskTagCreateManyRoleInputEnvelope, { nullable: true })
  @Type(() => UserInTaskTagCreateManyRoleInputEnvelope)
  createMany?: UserInTaskTagCreateManyRoleInputEnvelope;

  @Field(() => [UserInTaskTagWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskTagWhereUniqueInput)
  set?: Array<Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_roleId'>>;

  @Field(() => [UserInTaskTagWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskTagWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_roleId'>>;

  @Field(() => [UserInTaskTagWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskTagWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_roleId'>>;

  @Field(() => [UserInTaskTagWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskTagWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_roleId'>>;

  @Field(() => [UserInTaskTagUpdateWithWhereUniqueWithoutRoleInput], { nullable: true })
  @Type(() => UserInTaskTagUpdateWithWhereUniqueWithoutRoleInput)
  update?: Array<UserInTaskTagUpdateWithWhereUniqueWithoutRoleInput>;

  @Field(() => [UserInTaskTagUpdateManyWithWhereWithoutRoleInput], { nullable: true })
  @Type(() => UserInTaskTagUpdateManyWithWhereWithoutRoleInput)
  updateMany?: Array<UserInTaskTagUpdateManyWithWhereWithoutRoleInput>;

  @Field(() => [UserInTaskTagScalarWhereInput], { nullable: true })
  @Type(() => UserInTaskTagScalarWhereInput)
  deleteMany?: Array<UserInTaskTagScalarWhereInput>;
}
