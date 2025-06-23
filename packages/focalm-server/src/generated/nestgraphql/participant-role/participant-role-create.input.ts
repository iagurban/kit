import { Field, InputType } from '@nestjs/graphql';

import { UserInTaskTagCreateNestedManyWithoutRoleInput } from '../user-in-task-tag/user-in-task-tag-create-nested-many-without-role.input';

@InputType()
export class ParticipantRoleCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  color!: string;

  @Field(() => UserInTaskTagCreateNestedManyWithoutRoleInput, { nullable: true })
  usersInTasks?: UserInTaskTagCreateNestedManyWithoutRoleInput;
}
