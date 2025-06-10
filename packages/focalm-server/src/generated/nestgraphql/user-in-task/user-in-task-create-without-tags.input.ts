import { Field, InputType } from '@nestjs/graphql';

import { TaskCreateNestedOneWithoutParticipantsInput } from '../task/task-create-nested-one-without-participants.input';
import { UserCreateNestedOneWithoutParticipatingTasksInput } from '../user/user-create-nested-one-without-participating-tasks.input';

@InputType()
export class UserInTaskCreateWithoutTagsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => UserCreateNestedOneWithoutParticipatingTasksInput, { nullable: false })
  user!: UserCreateNestedOneWithoutParticipatingTasksInput;

  @Field(() => TaskCreateNestedOneWithoutParticipantsInput, { nullable: false })
  task!: TaskCreateNestedOneWithoutParticipantsInput;
}
