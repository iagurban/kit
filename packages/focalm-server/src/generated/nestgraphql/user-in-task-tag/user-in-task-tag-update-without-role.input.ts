import { Field, InputType } from '@nestjs/graphql';

import { UserInTaskUpdateOneRequiredWithoutTagsNestedInput } from '../user-in-task/user-in-task-update-one-required-without-tags-nested.input';

@InputType()
export class UserInTaskTagUpdateWithoutRoleInput {
  @Field(() => UserInTaskUpdateOneRequiredWithoutTagsNestedInput, { nullable: true })
  userInTask?: UserInTaskUpdateOneRequiredWithoutTagsNestedInput;
}
