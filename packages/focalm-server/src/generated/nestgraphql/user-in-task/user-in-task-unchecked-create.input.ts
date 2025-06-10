import { Field, InputType } from '@nestjs/graphql';

import { UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput } from '../user-in-task-tag/user-in-task-tag-unchecked-create-nested-many-without-user-in-task.input';

@InputType()
export class UserInTaskUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput, { nullable: true })
  tags?: UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput;
}
