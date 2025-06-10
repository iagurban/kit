import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskUpdateOneRequiredWithoutParticipantsNestedInput } from '../task/task-update-one-required-without-participants-nested.input';
import { UserUpdateOneRequiredWithoutParticipatingTasksNestedInput } from '../user/user-update-one-required-without-participating-tasks-nested.input';

@InputType()
export class UserInTaskUpdateWithoutTagsInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutParticipatingTasksNestedInput, { nullable: true })
  user?: UserUpdateOneRequiredWithoutParticipatingTasksNestedInput;

  @Field(() => TaskUpdateOneRequiredWithoutParticipantsNestedInput, { nullable: true })
  task?: TaskUpdateOneRequiredWithoutParticipantsNestedInput;
}
