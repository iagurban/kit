import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutAssignedTasksInput } from './user-create-or-connect-without-assigned-tasks.input';
import { UserCreateWithoutAssignedTasksInput } from './user-create-without-assigned-tasks.input';
import { UserUpdateToOneWithWhereWithoutAssignedTasksInput } from './user-update-to-one-with-where-without-assigned-tasks.input';
import { UserUpsertWithoutAssignedTasksInput } from './user-upsert-without-assigned-tasks.input';
import { UserWhereInput } from './user-where.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneWithoutAssignedTasksNestedInput {
  @Field(() => UserCreateWithoutAssignedTasksInput, { nullable: true })
  @Type(() => UserCreateWithoutAssignedTasksInput)
  create?: UserCreateWithoutAssignedTasksInput;

  @Field(() => UserCreateOrConnectWithoutAssignedTasksInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutAssignedTasksInput)
  connectOrCreate?: UserCreateOrConnectWithoutAssignedTasksInput;

  @Field(() => UserUpsertWithoutAssignedTasksInput, { nullable: true })
  @Type(() => UserUpsertWithoutAssignedTasksInput)
  upsert?: UserUpsertWithoutAssignedTasksInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  disconnect?: UserWhereInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  delete?: UserWhereInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;

  @Field(() => UserUpdateToOneWithWhereWithoutAssignedTasksInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutAssignedTasksInput)
  update?: UserUpdateToOneWithWhereWithoutAssignedTasksInput;
}
