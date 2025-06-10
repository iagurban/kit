import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskUpdateOneRequiredWithoutParticipantsNestedInput } from '../task/task-update-one-required-without-participants-nested.input';
import { UserUpdateOneRequiredWithoutParticipatingTasksNestedInput } from '../user/user-update-one-required-without-participating-tasks-nested.input';
import { UserInTaskTagUpdateManyWithoutUserInTaskNestedInput } from '../user-in-task-tag/user-in-task-tag-update-many-without-user-in-task-nested.input';

@InputType()
export class UserInTaskUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutParticipatingTasksNestedInput, { nullable: true })
  user?: UserUpdateOneRequiredWithoutParticipatingTasksNestedInput;

  @Field(() => TaskUpdateOneRequiredWithoutParticipantsNestedInput, { nullable: true })
  task?: TaskUpdateOneRequiredWithoutParticipantsNestedInput;

  @Field(() => UserInTaskTagUpdateManyWithoutUserInTaskNestedInput, { nullable: true })
  tags?: UserInTaskTagUpdateManyWithoutUserInTaskNestedInput;
}
