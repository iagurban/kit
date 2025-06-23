import { Field, ObjectType } from '@nestjs/graphql';

import { ParticipantRole } from '../participant-role/participant-role.model';
import { UserInTask } from '../user-in-task/user-in-task.model';

@ObjectType()
export class UserInTaskTag {
  @Field(() => String, { nullable: false })
  userInTaskId!: string;

  @Field(() => String, { nullable: false })
  roleId!: string;

  @Field(() => UserInTask, { nullable: false })
  userInTask?: UserInTask;

  @Field(() => ParticipantRole, { nullable: false })
  role?: ParticipantRole;
}
