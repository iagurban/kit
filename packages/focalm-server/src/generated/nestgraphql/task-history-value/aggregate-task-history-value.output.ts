import { Field, ObjectType } from '@nestjs/graphql';

import { TaskHistoryValueCountAggregate } from './task-history-value-count-aggregate.output';
import { TaskHistoryValueMaxAggregate } from './task-history-value-max-aggregate.output';
import { TaskHistoryValueMinAggregate } from './task-history-value-min-aggregate.output';

@ObjectType()
export class AggregateTaskHistoryValue {
  @Field(() => TaskHistoryValueCountAggregate, { nullable: true })
  _count?: TaskHistoryValueCountAggregate;

  @Field(() => TaskHistoryValueMinAggregate, { nullable: true })
  _min?: TaskHistoryValueMinAggregate;

  @Field(() => TaskHistoryValueMaxAggregate, { nullable: true })
  _max?: TaskHistoryValueMaxAggregate;
}
