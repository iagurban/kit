import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ParticipantRoleCreateWithoutUsersInTasksInput } from './participant-role-create-without-users-in-tasks.input';
import { ParticipantRoleWhereUniqueInput } from './participant-role-where-unique.input';

@InputType()
export class ParticipantRoleCreateOrConnectWithoutUsersInTasksInput {
  @Field(() => ParticipantRoleWhereUniqueInput, { nullable: false })
  @Type(() => ParticipantRoleWhereUniqueInput)
  where!: Prisma.AtLeast<ParticipantRoleWhereUniqueInput, 'id'>;

  @Field(() => ParticipantRoleCreateWithoutUsersInTasksInput, { nullable: false })
  @Type(() => ParticipantRoleCreateWithoutUsersInTasksInput)
  create!: ParticipantRoleCreateWithoutUsersInTasksInput;
}
