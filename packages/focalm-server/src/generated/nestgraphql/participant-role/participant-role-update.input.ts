import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserInTaskTagUpdateManyWithoutRoleNestedInput } from '../user-in-task-tag/user-in-task-tag-update-many-without-role-nested.input';

@InputType()
export class ParticipantRoleUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  color?: StringFieldUpdateOperationsInput;

  @Field(() => UserInTaskTagUpdateManyWithoutRoleNestedInput, { nullable: true })
  usersInTasks?: UserInTaskTagUpdateManyWithoutRoleNestedInput;
}
