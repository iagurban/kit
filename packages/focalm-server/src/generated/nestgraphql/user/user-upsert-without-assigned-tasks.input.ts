import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutAssignedTasksInput } from './user-create-without-assigned-tasks.input';
import { UserUpdateWithoutAssignedTasksInput } from './user-update-without-assigned-tasks.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutAssignedTasksInput {
  @Field(() => UserUpdateWithoutAssignedTasksInput, { nullable: false })
  @Type(() => UserUpdateWithoutAssignedTasksInput)
  update!: UserUpdateWithoutAssignedTasksInput;

  @Field(() => UserCreateWithoutAssignedTasksInput, { nullable: false })
  @Type(() => UserCreateWithoutAssignedTasksInput)
  create!: UserCreateWithoutAssignedTasksInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
