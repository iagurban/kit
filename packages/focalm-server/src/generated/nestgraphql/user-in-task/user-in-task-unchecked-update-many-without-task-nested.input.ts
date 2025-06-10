import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskCreateManyTaskInputEnvelope } from './user-in-task-create-many-task-input-envelope.input';
import { UserInTaskCreateOrConnectWithoutTaskInput } from './user-in-task-create-or-connect-without-task.input';
import { UserInTaskCreateWithoutTaskInput } from './user-in-task-create-without-task.input';
import { UserInTaskScalarWhereInput } from './user-in-task-scalar-where.input';
import { UserInTaskUpdateManyWithWhereWithoutTaskInput } from './user-in-task-update-many-with-where-without-task.input';
import { UserInTaskUpdateWithWhereUniqueWithoutTaskInput } from './user-in-task-update-with-where-unique-without-task.input';
import { UserInTaskUpsertWithWhereUniqueWithoutTaskInput } from './user-in-task-upsert-with-where-unique-without-task.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@InputType()
export class UserInTaskUncheckedUpdateManyWithoutTaskNestedInput {
  @Field(() => [UserInTaskCreateWithoutTaskInput], { nullable: true })
  @Type(() => UserInTaskCreateWithoutTaskInput)
  create?: Array<UserInTaskCreateWithoutTaskInput>;

  @Field(() => [UserInTaskCreateOrConnectWithoutTaskInput], { nullable: true })
  @Type(() => UserInTaskCreateOrConnectWithoutTaskInput)
  connectOrCreate?: Array<UserInTaskCreateOrConnectWithoutTaskInput>;

  @Field(() => [UserInTaskUpsertWithWhereUniqueWithoutTaskInput], { nullable: true })
  @Type(() => UserInTaskUpsertWithWhereUniqueWithoutTaskInput)
  upsert?: Array<UserInTaskUpsertWithWhereUniqueWithoutTaskInput>;

  @Field(() => UserInTaskCreateManyTaskInputEnvelope, { nullable: true })
  @Type(() => UserInTaskCreateManyTaskInputEnvelope)
  createMany?: UserInTaskCreateManyTaskInputEnvelope;

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

  @Field(() => [UserInTaskUpdateWithWhereUniqueWithoutTaskInput], { nullable: true })
  @Type(() => UserInTaskUpdateWithWhereUniqueWithoutTaskInput)
  update?: Array<UserInTaskUpdateWithWhereUniqueWithoutTaskInput>;

  @Field(() => [UserInTaskUpdateManyWithWhereWithoutTaskInput], { nullable: true })
  @Type(() => UserInTaskUpdateManyWithWhereWithoutTaskInput)
  updateMany?: Array<UserInTaskUpdateManyWithWhereWithoutTaskInput>;

  @Field(() => [UserInTaskScalarWhereInput], { nullable: true })
  @Type(() => UserInTaskScalarWhereInput)
  deleteMany?: Array<UserInTaskScalarWhereInput>;
}
