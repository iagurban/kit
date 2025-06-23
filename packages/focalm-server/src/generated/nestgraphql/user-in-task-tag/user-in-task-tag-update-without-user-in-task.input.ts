import { Field, InputType } from '@nestjs/graphql';

import { ParticipantRoleUpdateOneRequiredWithoutUsersInTasksNestedInput } from '../participant-role/participant-role-update-one-required-without-users-in-tasks-nested.input';

@InputType()
export class UserInTaskTagUpdateWithoutUserInTaskInput {
  @Field(() => ParticipantRoleUpdateOneRequiredWithoutUsersInTasksNestedInput, { nullable: true })
  role?: ParticipantRoleUpdateOneRequiredWithoutUsersInTasksNestedInput;
}
