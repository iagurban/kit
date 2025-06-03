import { Field, ObjectType } from '@nestjs/graphql';

import { TaskHistoryGroupCountAggregate } from './task-history-group-count-aggregate.output';
import { TaskHistoryGroupMaxAggregate } from './task-history-group-max-aggregate.output';
import { TaskHistoryGroupMinAggregate } from './task-history-group-min-aggregate.output';

@ObjectType()
export class AggregateTaskHistoryGroup {
  @Field(() => TaskHistoryGroupCountAggregate, { nullable: true })
  _count?: TaskHistoryGroupCountAggregate;

  @Field(() => TaskHistoryGroupMinAggregate, { nullable: true })
  _min?: TaskHistoryGroupMinAggregate;

  @Field(() => TaskHistoryGroupMaxAggregate, { nullable: true })
  _max?: TaskHistoryGroupMaxAggregate;
}
