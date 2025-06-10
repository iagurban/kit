import { Field, InputType } from '@nestjs/graphql';

import { UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput } from '../user-in-task-tag/user-in-task-tag-unchecked-create-nested-many-without-user-in-task.input';

@InputType()
export class UserInTaskUncheckedCreateWithoutTaskInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput, { nullable: true })
  tags?: UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput;
}
