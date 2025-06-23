import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ParticipantRoleCreateOrConnectWithoutUsersInTasksInput } from './participant-role-create-or-connect-without-users-in-tasks.input';
import { ParticipantRoleCreateWithoutUsersInTasksInput } from './participant-role-create-without-users-in-tasks.input';
import { ParticipantRoleWhereUniqueInput } from './participant-role-where-unique.input';

@InputType()
export class ParticipantRoleCreateNestedOneWithoutUsersInTasksInput {
  @Field(() => ParticipantRoleCreateWithoutUsersInTasksInput, { nullable: true })
  @Type(() => ParticipantRoleCreateWithoutUsersInTasksInput)
  create?: ParticipantRoleCreateWithoutUsersInTasksInput;

  @Field(() => ParticipantRoleCreateOrConnectWithoutUsersInTasksInput, { nullable: true })
  @Type(() => ParticipantRoleCreateOrConnectWithoutUsersInTasksInput)
  connectOrCreate?: ParticipantRoleCreateOrConnectWithoutUsersInTasksInput;

  @Field(() => ParticipantRoleWhereUniqueInput, { nullable: true })
  @Type(() => ParticipantRoleWhereUniqueInput)
  connect?: Prisma.AtLeast<ParticipantRoleWhereUniqueInput, 'id'>;
}
