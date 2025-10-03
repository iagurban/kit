import { Field, ObjectType } from '@nestjs/graphql';

import { MessagesCounterAvgAggregate } from './messages-counter-avg-aggregate.output';
import { MessagesCounterCountAggregate } from './messages-counter-count-aggregate.output';
import { MessagesCounterMaxAggregate } from './messages-counter-max-aggregate.output';
import { MessagesCounterMinAggregate } from './messages-counter-min-aggregate.output';
import { MessagesCounterSumAggregate } from './messages-counter-sum-aggregate.output';

@ObjectType()
export class AggregateMessagesCounter {
  @Field(() => MessagesCounterCountAggregate, { nullable: true })
  _count?: MessagesCounterCountAggregate;

  @Field(() => MessagesCounterAvgAggregate, { nullable: true })
  _avg?: MessagesCounterAvgAggregate;

  @Field(() => MessagesCounterSumAggregate, { nullable: true })
  _sum?: MessagesCounterSumAggregate;

  @Field(() => MessagesCounterMinAggregate, { nullable: true })
  _min?: MessagesCounterMinAggregate;

  @Field(() => MessagesCounterMaxAggregate, { nullable: true })
  _max?: MessagesCounterMaxAggregate;
}
