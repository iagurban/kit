import { Field, InputType } from '@nestjs/graphql';

import { ParticipantRoleCreateNestedOneWithoutUsersInTasksInput } from '../participant-role/participant-role-create-nested-one-without-users-in-tasks.input';

@InputType()
export class UserInTaskTagCreateWithoutUserInTaskInput {
  @Field(() => ParticipantRoleCreateNestedOneWithoutUsersInTasksInput, { nullable: false })
  role!: ParticipantRoleCreateNestedOneWithoutUsersInTasksInput;
}
