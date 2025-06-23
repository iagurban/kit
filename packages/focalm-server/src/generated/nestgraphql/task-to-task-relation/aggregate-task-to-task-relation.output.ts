import { Field, ObjectType } from '@nestjs/graphql';

import { TaskToTaskRelationCountAggregate } from './task-to-task-relation-count-aggregate.output';
import { TaskToTaskRelationMaxAggregate } from './task-to-task-relation-max-aggregate.output';
import { TaskToTaskRelationMinAggregate } from './task-to-task-relation-min-aggregate.output';

@ObjectType()
export class AggregateTaskToTaskRelation {
  @Field(() => TaskToTaskRelationCountAggregate, { nullable: true })
  _count?: TaskToTaskRelationCountAggregate;

  @Field(() => TaskToTaskRelationMinAggregate, { nullable: true })
  _min?: TaskToTaskRelationMinAggregate;

  @Field(() => TaskToTaskRelationMaxAggregate, { nullable: true })
  _max?: TaskToTaskRelationMaxAggregate;
}
