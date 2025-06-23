import { Field, InputType } from '@nestjs/graphql';

import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UserInTaskTagListRelationFilter } from '../user-in-task-tag/user-in-task-tag-list-relation-filter.input';

@InputType()
export class ParticipantRoleWhereInput {
  @Field(() => [ParticipantRoleWhereInput], { nullable: true })
  AND?: Array<ParticipantRoleWhereInput>;

  @Field(() => [ParticipantRoleWhereInput], { nullable: true })
  OR?: Array<ParticipantRoleWhereInput>;

  @Field(() => [ParticipantRoleWhereInput], { nullable: true })
  NOT?: Array<ParticipantRoleWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  color?: StringFilter;

  @Field(() => UserInTaskTagListRelationFilter, { nullable: true })
  usersInTasks?: UserInTaskTagListRelationFilter;
}
