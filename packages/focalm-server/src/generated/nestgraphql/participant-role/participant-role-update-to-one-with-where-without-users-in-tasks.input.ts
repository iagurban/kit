import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ParticipantRoleUpdateWithoutUsersInTasksInput } from './participant-role-update-without-users-in-tasks.input';
import { ParticipantRoleWhereInput } from './participant-role-where.input';

@InputType()
export class ParticipantRoleUpdateToOneWithWhereWithoutUsersInTasksInput {
  @Field(() => ParticipantRoleWhereInput, { nullable: true })
  @Type(() => ParticipantRoleWhereInput)
  where?: ParticipantRoleWhereInput;

  @Field(() => ParticipantRoleUpdateWithoutUsersInTasksInput, { nullable: false })
  @Type(() => ParticipantRoleUpdateWithoutUsersInTasksInput)
  data!: ParticipantRoleUpdateWithoutUsersInTasksInput;
}
