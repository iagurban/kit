import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskUpdateOneRequiredWithoutParticipantsNestedInput } from '../task/task-update-one-required-without-participants-nested.input';
import { UserInTaskTagUpdateManyWithoutUserInTaskNestedInput } from '../user-in-task-tag/user-in-task-tag-update-many-without-user-in-task-nested.input';

@InputType()
export class UserInTaskUpdateWithoutUserInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => TaskUpdateOneRequiredWithoutParticipantsNestedInput, { nullable: true })
  task?: TaskUpdateOneRequiredWithoutParticipantsNestedInput;

  @Field(() => UserInTaskTagUpdateManyWithoutUserInTaskNestedInput, { nullable: true })
  tags?: UserInTaskTagUpdateManyWithoutUserInTaskNestedInput;
}
