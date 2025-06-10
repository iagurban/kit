import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskCreateManyUserInputEnvelope } from './user-in-task-create-many-user-input-envelope.input';
import { UserInTaskCreateOrConnectWithoutUserInput } from './user-in-task-create-or-connect-without-user.input';
import { UserInTaskCreateWithoutUserInput } from './user-in-task-create-without-user.input';
import { UserInTaskScalarWhereInput } from './user-in-task-scalar-where.input';
import { UserInTaskUpdateManyWithWhereWithoutUserInput } from './user-in-task-update-many-with-where-without-user.input';
import { UserInTaskUpdateWithWhereUniqueWithoutUserInput } from './user-in-task-update-with-where-unique-without-user.input';
import { UserInTaskUpsertWithWhereUniqueWithoutUserInput } from './user-in-task-upsert-with-where-unique-without-user.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@InputType()
export class UserInTaskUncheckedUpdateManyWithoutUserNestedInput {
  @Field(() => [UserInTaskCreateWithoutUserInput], { nullable: true })
  @Type(() => UserInTaskCreateWithoutUserInput)
  create?: Array<UserInTaskCreateWithoutUserInput>;

  @Field(() => [UserInTaskCreateOrConnectWithoutUserInput], { nullable: true })
  @Type(() => UserInTaskCreateOrConnectWithoutUserInput)
  connectOrCreate?: Array<UserInTaskCreateOrConnectWithoutUserInput>;

  @Field(() => [UserInTaskUpsertWithWhereUniqueWithoutUserInput], { nullable: true })
  @Type(() => UserInTaskUpsertWithWhereUniqueWithoutUserInput)
  upsert?: Array<UserInTaskUpsertWithWhereUniqueWithoutUserInput>;

  @Field(() => UserInTaskCreateManyUserInputEnvelope, { nullable: true })
  @Type(() => UserInTaskCreateManyUserInputEnvelope)
  createMany?: UserInTaskCreateManyUserInputEnvelope;

  @Field(() => [UserInTaskWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskWhereUniqueInput)
  set?: Array<Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>>;

  @Field(() => [UserInTaskWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>>;

  @Field(() => [UserInTaskWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>>;

  @Field(() => [UserInTaskWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>>;

  @Field(() => [UserInTaskUpdateWithWhereUniqueWithoutUserInput], { nullable: true })
  @Type(() => UserInTaskUpdateWithWhereUniqueWithoutUserInput)
  update?: Array<UserInTaskUpdateWithWhereUniqueWithoutUserInput>;

  @Field(() => [UserInTaskUpdateManyWithWhereWithoutUserInput], { nullable: true })
  @Type(() => UserInTaskUpdateManyWithWhereWithoutUserInput)
  updateMany?: Array<UserInTaskUpdateManyWithWhereWithoutUserInput>;

  @Field(() => [UserInTaskScalarWhereInput], { nullable: true })
  @Type(() => UserInTaskScalarWhereInput)
  deleteMany?: Array<UserInTaskScalarWhereInput>;
}
