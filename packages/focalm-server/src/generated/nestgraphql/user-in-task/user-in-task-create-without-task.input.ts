import { Field, InputType } from '@nestjs/graphql';

import { UserCreateNestedOneWithoutParticipatingTasksInput } from '../user/user-create-nested-one-without-participating-tasks.input';
import { UserInTaskTagCreateNestedManyWithoutUserInTaskInput } from '../user-in-task-tag/user-in-task-tag-create-nested-many-without-user-in-task.input';

@InputType()
export class UserInTaskCreateWithoutTaskInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => UserCreateNestedOneWithoutParticipatingTasksInput, { nullable: false })
  user!: UserCreateNestedOneWithoutParticipatingTasksInput;

  @Field(() => UserInTaskTagCreateNestedManyWithoutUserInTaskInput, { nullable: true })
  tags?: UserInTaskTagCreateNestedManyWithoutUserInTaskInput;
}
