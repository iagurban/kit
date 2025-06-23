import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ParticipantRoleCreateWithoutUsersInTasksInput } from './participant-role-create-without-users-in-tasks.input';
import { ParticipantRoleUpdateWithoutUsersInTasksInput } from './participant-role-update-without-users-in-tasks.input';
import { ParticipantRoleWhereInput } from './participant-role-where.input';

@InputType()
export class ParticipantRoleUpsertWithoutUsersInTasksInput {
  @Field(() => ParticipantRoleUpdateWithoutUsersInTasksInput, { nullable: false })
  @Type(() => ParticipantRoleUpdateWithoutUsersInTasksInput)
  update!: ParticipantRoleUpdateWithoutUsersInTasksInput;

  @Field(() => ParticipantRoleCreateWithoutUsersInTasksInput, { nullable: false })
  @Type(() => ParticipantRoleCreateWithoutUsersInTasksInput)
  create!: ParticipantRoleCreateWithoutUsersInTasksInput;

  @Field(() => ParticipantRoleWhereInput, { nullable: true })
  @Type(() => ParticipantRoleWhereInput)
  where?: ParticipantRoleWhereInput;
}
