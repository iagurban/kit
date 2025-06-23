import { Field, InputType } from '@nestjs/graphql';

import { StringFilter } from '../prisma/string-filter.input';
import { UserInTaskTagListRelationFilter } from '../user-in-task-tag/user-in-task-tag-list-relation-filter.input';
import { ParticipantRoleWhereInput } from './participant-role-where.input';

@InputType()
export class ParticipantRoleWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [ParticipantRoleWhereInput], { nullable: true })
  AND?: Array<ParticipantRoleWhereInput>;

  @Field(() => [ParticipantRoleWhereInput], { nullable: true })
  OR?: Array<ParticipantRoleWhereInput>;

  @Field(() => [ParticipantRoleWhereInput], { nullable: true })
  NOT?: Array<ParticipantRoleWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  color?: StringFilter;

  @Field(() => UserInTaskTagListRelationFilter, { nullable: true })
  usersInTasks?: UserInTaskTagListRelationFilter;
}
