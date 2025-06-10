import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserInTaskUpdateOneRequiredWithoutTagsNestedInput } from '../user-in-task/user-in-task-update-one-required-without-tags-nested.input';

@InputType()
export class UserInTaskTagUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  tag?: StringFieldUpdateOperationsInput;

  @Field(() => UserInTaskUpdateOneRequiredWithoutTagsNestedInput, { nullable: true })
  userInTask?: UserInTaskUpdateOneRequiredWithoutTagsNestedInput;
}
