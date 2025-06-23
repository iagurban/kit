import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Project } from '../project/project.model';
import { TaskToTaskRelation } from '../task-to-task-relation/task-to-task-relation.model';
import { TaskToTaskRelationTypeCount } from './task-to-task-relation-type-count.output';

@ObjectType()
export class TaskToTaskRelationType {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  forward!: string;

  @Field(() => String, { nullable: false })
  inverse!: string;

  @Field(() => String, { nullable: false })
  projectId!: string;

  @Field(() => [TaskToTaskRelation], { nullable: true })
  relations?: Array<TaskToTaskRelation>;

  @Field(() => Project, { nullable: false })
  project?: Project;

  @Field(() => TaskToTaskRelationTypeCount, { nullable: false })
  _count?: TaskToTaskRelationTypeCount;
}
