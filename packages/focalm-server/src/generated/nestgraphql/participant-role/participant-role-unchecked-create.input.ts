import { Field, InputType } from '@nestjs/graphql';

import { UserInTaskTagUncheckedCreateNestedManyWithoutRoleInput } from '../user-in-task-tag/user-in-task-tag-unchecked-create-nested-many-without-role.input';

@InputType()
export class ParticipantRoleUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  color!: string;

  @Field(() => UserInTaskTagUncheckedCreateNestedManyWithoutRoleInput, { nullable: true })
  usersInTasks?: UserInTaskTagUncheckedCreateNestedManyWithoutRoleInput;
}
