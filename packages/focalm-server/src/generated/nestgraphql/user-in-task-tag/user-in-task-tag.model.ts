import { Field, ObjectType } from '@nestjs/graphql';

import { UserInTask } from '../user-in-task/user-in-task.model';

@ObjectType()
export class UserInTaskTag {
  @Field(() => String, { nullable: false })
  userInTaskId!: string;

  @Field(() => String, { nullable: false })
  tag!: string;

  @Field(() => UserInTask, { nullable: false })
  userInTask?: UserInTask;
}
