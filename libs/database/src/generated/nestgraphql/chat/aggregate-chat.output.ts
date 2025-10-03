import { Field, ObjectType } from '@nestjs/graphql';

import { ChatCountAggregate } from './chat-count-aggregate.output';
import { ChatMaxAggregate } from './chat-max-aggregate.output';
import { ChatMinAggregate } from './chat-min-aggregate.output';

@ObjectType()
export class AggregateChat {
  @Field(() => ChatCountAggregate, { nullable: true })
  _count?: ChatCountAggregate;

  @Field(() => ChatMinAggregate, { nullable: true })
  _min?: ChatMinAggregate;

  @Field(() => ChatMaxAggregate, { nullable: true })
  _max?: ChatMaxAggregate;
}
