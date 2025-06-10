import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Task } from '../task/task.model';
import { User } from '../user/user.model';
import { UserInTaskTag } from '../user-in-task-tag/user-in-task-tag.model';
import { UserInTaskCount } from './user-in-task-count.output';

@ObjectType()
export class UserInTask {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => User, { nullable: false })
  user?: User;

  @Field(() => Task, { nullable: false })
  task?: Task;

  @Field(() => [UserInTaskTag], { nullable: true })
  tags?: Array<UserInTaskTag>;

  @Field(() => UserInTaskCount, { nullable: false })
  _count?: UserInTaskCount;
}
