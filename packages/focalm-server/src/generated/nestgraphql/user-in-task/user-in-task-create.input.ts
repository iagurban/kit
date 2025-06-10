import { Field, InputType } from '@nestjs/graphql';

import { TaskCreateNestedOneWithoutParticipantsInput } from '../task/task-create-nested-one-without-participants.input';
import { UserCreateNestedOneWithoutParticipatingTasksInput } from '../user/user-create-nested-one-without-participating-tasks.input';
import { UserInTaskTagCreateNestedManyWithoutUserInTaskInput } from '../user-in-task-tag/user-in-task-tag-create-nested-many-without-user-in-task.input';

@InputType()
export class UserInTaskCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => UserCreateNestedOneWithoutParticipatingTasksInput, { nullable: false })
  user!: UserCreateNestedOneWithoutParticipatingTasksInput;

  @Field(() => TaskCreateNestedOneWithoutParticipantsInput, { nullable: false })
  task!: TaskCreateNestedOneWithoutParticipantsInput;

  @Field(() => UserInTaskTagCreateNestedManyWithoutUserInTaskInput, { nullable: true })
  tags?: UserInTaskTagCreateNestedManyWithoutUserInTaskInput;
}
