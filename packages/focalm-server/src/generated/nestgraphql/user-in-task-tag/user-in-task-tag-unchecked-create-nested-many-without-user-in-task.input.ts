import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagCreateManyUserInTaskInputEnvelope } from './user-in-task-tag-create-many-user-in-task-input-envelope.input';
import { UserInTaskTagCreateOrConnectWithoutUserInTaskInput } from './user-in-task-tag-create-or-connect-without-user-in-task.input';
import { UserInTaskTagCreateWithoutUserInTaskInput } from './user-in-task-tag-create-without-user-in-task.input';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@InputType()
export class UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput {
  @Field(() => [UserInTaskTagCreateWithoutUserInTaskInput], { nullable: true })
  @Type(() => UserInTaskTagCreateWithoutUserInTaskInput)
  create?: Array<UserInTaskTagCreateWithoutUserInTaskInput>;

  @Field(() => [UserInTaskTagCreateOrConnectWithoutUserInTaskInput], { nullable: true })
  @Type(() => UserInTaskTagCreateOrConnectWithoutUserInTaskInput)
  connectOrCreate?: Array<UserInTaskTagCreateOrConnectWithoutUserInTaskInput>;

  @Field(() => UserInTaskTagCreateManyUserInTaskInputEnvelope, { nullable: true })
  @Type(() => UserInTaskTagCreateManyUserInTaskInputEnvelope)
  createMany?: UserInTaskTagCreateManyUserInTaskInputEnvelope;

  @Field(() => [UserInTaskTagWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskTagWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_tag'>>;
}
