import { Field, InputType } from '@nestjs/graphql';

import { UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput } from '../user-in-task-tag/user-in-task-tag-unchecked-create-nested-many-without-user-in-task.input';

@InputType()
export class UserInTaskUncheckedCreateWithoutUserInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput, { nullable: true })
  tags?: UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput;
}
