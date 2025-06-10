import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagCreateManyUserInTaskInputEnvelope } from './user-in-task-tag-create-many-user-in-task-input-envelope.input';
import { UserInTaskTagCreateOrConnectWithoutUserInTaskInput } from './user-in-task-tag-create-or-connect-without-user-in-task.input';
import { UserInTaskTagCreateWithoutUserInTaskInput } from './user-in-task-tag-create-without-user-in-task.input';
import { UserInTaskTagScalarWhereInput } from './user-in-task-tag-scalar-where.input';
import { UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInput } from './user-in-task-tag-update-many-with-where-without-user-in-task.input';
import { UserInTaskTagUpdateWithWhereUniqueWithoutUserInTaskInput } from './user-in-task-tag-update-with-where-unique-without-user-in-task.input';
import { UserInTaskTagUpsertWithWhereUniqueWithoutUserInTaskInput } from './user-in-task-tag-upsert-with-where-unique-without-user-in-task.input';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@InputType()
export class UserInTaskTagUncheckedUpdateManyWithoutUserInTaskNestedInput {
  @Field(() => [UserInTaskTagCreateWithoutUserInTaskInput], { nullable: true })
  @Type(() => UserInTaskTagCreateWithoutUserInTaskInput)
  create?: Array<UserInTaskTagCreateWithoutUserInTaskInput>;

  @Field(() => [UserInTaskTagCreateOrConnectWithoutUserInTaskInput], { nullable: true })
  @Type(() => UserInTaskTagCreateOrConnectWithoutUserInTaskInput)
  connectOrCreate?: Array<UserInTaskTagCreateOrConnectWithoutUserInTaskInput>;

  @Field(() => [UserInTaskTagUpsertWithWhereUniqueWithoutUserInTaskInput], { nullable: true })
  @Type(() => UserInTaskTagUpsertWithWhereUniqueWithoutUserInTaskInput)
  upsert?: Array<UserInTaskTagUpsertWithWhereUniqueWithoutUserInTaskInput>;

  @Field(() => UserInTaskTagCreateManyUserInTaskInputEnvelope, { nullable: true })
  @Type(() => UserInTaskTagCreateManyUserInTaskInputEnvelope)
  createMany?: UserInTaskTagCreateManyUserInTaskInputEnvelope;

  @Field(() => [UserInTaskTagWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskTagWhereUniqueInput)
  set?: Array<Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_tag'>>;

  @Field(() => [UserInTaskTagWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskTagWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_tag'>>;

  @Field(() => [UserInTaskTagWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskTagWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_tag'>>;

  @Field(() => [UserInTaskTagWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskTagWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_tag'>>;

  @Field(() => [UserInTaskTagUpdateWithWhereUniqueWithoutUserInTaskInput], { nullable: true })
  @Type(() => UserInTaskTagUpdateWithWhereUniqueWithoutUserInTaskInput)
  update?: Array<UserInTaskTagUpdateWithWhereUniqueWithoutUserInTaskInput>;

  @Field(() => [UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInput], { nullable: true })
  @Type(() => UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInput)
  updateMany?: Array<UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInput>;

  @Field(() => [UserInTaskTagScalarWhereInput], { nullable: true })
  @Type(() => UserInTaskTagScalarWhereInput)
  deleteMany?: Array<UserInTaskTagScalarWhereInput>;
}
