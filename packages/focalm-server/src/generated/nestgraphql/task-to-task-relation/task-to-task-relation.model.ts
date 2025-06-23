import { Field, ObjectType } from '@nestjs/graphql';

import { Task } from '../task/task.model';
import { TaskToTaskRelationType } from '../task-to-task-relation-type/task-to-task-relation-type.model';

@ObjectType()
export class TaskToTaskRelation {
  @Field(() => String, { nullable: false })
  srcId!: string;

  @Field(() => String, { nullable: false })
  dstId!: string;

  @Field(() => String, { nullable: false })
  typeId!: string;

  @Field(() => Task, { nullable: false })
  src?: Task;

  @Field(() => Task, { nullable: false })
  dst?: Task;

  @Field(() => TaskToTaskRelationType, { nullable: false })
  type?: TaskToTaskRelationType;
}
