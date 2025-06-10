import { Field, InputType } from '@nestjs/graphql';

import { TaskCreateNestedOneWithoutParticipantsInput } from '../task/task-create-nested-one-without-participants.input';
import { UserInTaskTagCreateNestedManyWithoutUserInTaskInput } from '../user-in-task-tag/user-in-task-tag-create-nested-many-without-user-in-task.input';

@InputType()
export class UserInTaskCreateWithoutUserInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => TaskCreateNestedOneWithoutParticipantsInput, { nullable: false })
  task!: TaskCreateNestedOneWithoutParticipantsInput;

  @Field(() => UserInTaskTagCreateNestedManyWithoutUserInTaskInput, { nullable: true })
  tags?: UserInTaskTagCreateNestedManyWithoutUserInTaskInput;
}
