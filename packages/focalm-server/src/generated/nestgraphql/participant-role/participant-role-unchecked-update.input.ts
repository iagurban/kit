import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserInTaskTagUncheckedUpdateManyWithoutRoleNestedInput } from '../user-in-task-tag/user-in-task-tag-unchecked-update-many-without-role-nested.input';

@InputType()
export class ParticipantRoleUncheckedUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  color?: StringFieldUpdateOperationsInput;

  @Field(() => UserInTaskTagUncheckedUpdateManyWithoutRoleNestedInput, { nullable: true })
  usersInTasks?: UserInTaskTagUncheckedUpdateManyWithoutRoleNestedInput;
}
