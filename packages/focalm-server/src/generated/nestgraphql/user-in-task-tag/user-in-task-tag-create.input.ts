import { Field, InputType } from '@nestjs/graphql';

import { UserInTaskCreateNestedOneWithoutTagsInput } from '../user-in-task/user-in-task-create-nested-one-without-tags.input';

@InputType()
export class UserInTaskTagCreateInput {
  @Field(() => String, { nullable: false })
  tag!: string;

  @Field(() => UserInTaskCreateNestedOneWithoutTagsInput, { nullable: false })
  userInTask!: UserInTaskCreateNestedOneWithoutTagsInput;
}
