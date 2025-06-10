import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserInTaskTagUncheckedUpdateManyWithoutUserInTaskNestedInput } from '../user-in-task-tag/user-in-task-tag-unchecked-update-many-without-user-in-task-nested.input';

@InputType()
export class UserInTaskUncheckedUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  userId?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  taskId?: StringFieldUpdateOperationsInput;

  @Field(() => UserInTaskTagUncheckedUpdateManyWithoutUserInTaskNestedInput, { nullable: true })
  tags?: UserInTaskTagUncheckedUpdateManyWithoutUserInTaskNestedInput;
}
