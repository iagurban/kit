import { Field, InputType } from '@nestjs/graphql';

import { ParticipantRoleUpdateOneRequiredWithoutUsersInTasksNestedInput } from '../participant-role/participant-role-update-one-required-without-users-in-tasks-nested.input';
import { UserInTaskUpdateOneRequiredWithoutTagsNestedInput } from '../user-in-task/user-in-task-update-one-required-without-tags-nested.input';

@InputType()
export class UserInTaskTagUpdateInput {
  @Field(() => UserInTaskUpdateOneRequiredWithoutTagsNestedInput, { nullable: true })
  userInTask?: UserInTaskUpdateOneRequiredWithoutTagsNestedInput;

  @Field(() => ParticipantRoleUpdateOneRequiredWithoutUsersInTasksNestedInput, { nullable: true })
  role?: ParticipantRoleUpdateOneRequiredWithoutUsersInTasksNestedInput;
}
