import { Field, ObjectType } from '@nestjs/graphql';

import { TaskToTaskRelationTypeCountAggregate } from './task-to-task-relation-type-count-aggregate.output';
import { TaskToTaskRelationTypeMaxAggregate } from './task-to-task-relation-type-max-aggregate.output';
import { TaskToTaskRelationTypeMinAggregate } from './task-to-task-relation-type-min-aggregate.output';

@ObjectType()
export class TaskToTaskRelationTypeGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  forward!: string;

  @Field(() => String, { nullable: false })
  inverse!: string;

  @Field(() => String, { nullable: false })
  projectId!: string;

  @Field(() => TaskToTaskRelationTypeCountAggregate, { nullable: true })
  _count?: TaskToTaskRelationTypeCountAggregate;

  @Field(() => TaskToTaskRelationTypeMinAggregate, { nullable: true })
  _min?: TaskToTaskRelationTypeMinAggregate;

  @Field(() => TaskToTaskRelationTypeMaxAggregate, { nullable: true })
  _max?: TaskToTaskRelationTypeMaxAggregate;
}
