import { Field, ObjectType } from '@nestjs/graphql';

import { TaskToTaskRelationTypeCountAggregate } from './task-to-task-relation-type-count-aggregate.output';
import { TaskToTaskRelationTypeMaxAggregate } from './task-to-task-relation-type-max-aggregate.output';
import { TaskToTaskRelationTypeMinAggregate } from './task-to-task-relation-type-min-aggregate.output';

@ObjectType()
export class AggregateTaskToTaskRelationType {
  @Field(() => TaskToTaskRelationTypeCountAggregate, { nullable: true })
  _count?: TaskToTaskRelationTypeCountAggregate;

  @Field(() => TaskToTaskRelationTypeMinAggregate, { nullable: true })
  _min?: TaskToTaskRelationTypeMinAggregate;

  @Field(() => TaskToTaskRelationTypeMaxAggregate, { nullable: true })
  _max?: TaskToTaskRelationTypeMaxAggregate;
}
