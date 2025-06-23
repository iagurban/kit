import { Field, InputType } from '@nestjs/graphql';

import { ParticipantRoleCreateNestedOneWithoutUsersInTasksInput } from '../participant-role/participant-role-create-nested-one-without-users-in-tasks.input';
import { UserInTaskCreateNestedOneWithoutTagsInput } from '../user-in-task/user-in-task-create-nested-one-without-tags.input';

@InputType()
export class UserInTaskTagCreateInput {
  @Field(() => UserInTaskCreateNestedOneWithoutTagsInput, { nullable: false })
  userInTask!: UserInTaskCreateNestedOneWithoutTagsInput;

  @Field(() => ParticipantRoleCreateNestedOneWithoutUsersInTasksInput, { nullable: false })
  role!: ParticipantRoleCreateNestedOneWithoutUsersInTasksInput;
}
