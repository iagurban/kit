import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserInTaskTag } from '../user-in-task-tag/user-in-task-tag.model';
import { ParticipantRoleCount } from './participant-role-count.output';

@ObjectType()
export class ParticipantRole {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  color!: string;

  @Field(() => [UserInTaskTag], { nullable: true })
  usersInTasks?: Array<UserInTaskTag>;

  @Field(() => ParticipantRoleCount, { nullable: false })
  _count?: ParticipantRoleCount;
}
