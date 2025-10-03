import { Field, ObjectType } from '@nestjs/graphql';

import { ChatEventsCounterAvgAggregate } from './chat-events-counter-avg-aggregate.output';
import { ChatEventsCounterCountAggregate } from './chat-events-counter-count-aggregate.output';
import { ChatEventsCounterMaxAggregate } from './chat-events-counter-max-aggregate.output';
import { ChatEventsCounterMinAggregate } from './chat-events-counter-min-aggregate.output';
import { ChatEventsCounterSumAggregate } from './chat-events-counter-sum-aggregate.output';

@ObjectType()
export class AggregateChatEventsCounter {
  @Field(() => ChatEventsCounterCountAggregate, { nullable: true })
  _count?: ChatEventsCounterCountAggregate;

  @Field(() => ChatEventsCounterAvgAggregate, { nullable: true })
  _avg?: ChatEventsCounterAvgAggregate;

  @Field(() => ChatEventsCounterSumAggregate, { nullable: true })
  _sum?: ChatEventsCounterSumAggregate;

  @Field(() => ChatEventsCounterMinAggregate, { nullable: true })
  _min?: ChatEventsCounterMinAggregate;

  @Field(() => ChatEventsCounterMaxAggregate, { nullable: true })
  _max?: ChatEventsCounterMaxAggregate;
}
