import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Task } from '../task/task.model';
import { TaskToTaskRelationType } from '../task-to-task-relation-type/task-to-task-relation-type.model';
import { User } from '../user/user.model';
import { UserInProject } from '../user-in-project/user-in-project.model';
import { ProjectCount } from './project-count.output';

@ObjectType()
export class Project {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { defaultValue: '0', nullable: false })
  tasksCounter!: bigint;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  abbrev!: string | null;

  @Field(() => User, { nullable: true })
  ownOf?: User | null;

  @Field(() => [TaskToTaskRelationType], { nullable: true })
  relationTypes?: Array<TaskToTaskRelationType>;

  @Field(() => [Task], { nullable: true })
  tasks?: Array<Task>;

  @Field(() => [UserInProject], { nullable: true })
  usersPermissions?: Array<UserInProject>;

  @Field(() => ProjectCount, { nullable: false })
  _count?: ProjectCount;
}
