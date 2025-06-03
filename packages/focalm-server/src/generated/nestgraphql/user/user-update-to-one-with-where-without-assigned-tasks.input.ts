import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutAssignedTasksInput } from './user-update-without-assigned-tasks.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutAssignedTasksInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutAssignedTasksInput, { nullable: false })
  @Type(() => UserUpdateWithoutAssignedTasksInput)
  data!: UserUpdateWithoutAssignedTasksInput;
}
