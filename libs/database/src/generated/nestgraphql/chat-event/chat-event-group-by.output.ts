import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatEventAvgAggregate } from './chat-event-avg-aggregate.output';
import { ChatEventCountAggregate } from './chat-event-count-aggregate.output';
import { ChatEventMaxAggregate } from './chat-event-max-aggregate.output';
import { ChatEventMinAggregate } from './chat-event-min-aggregate.output';
import { ChatEventSumAggregate } from './chat-event-sum-aggregate.output';

@ObjectType()
export class ChatEventGroupBy {
  @Field(() => String, { nullable: false })
  id!: bigint | number;

  @Field(() => String, { nullable: false })
  nn!: bigint | number;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => String, { nullable: false })
  type!: string;

  @Field(() => GraphQLJSON, { nullable: false })
  payload!: any;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => ChatEventCountAggregate, { nullable: true })
  _count?: ChatEventCountAggregate;

  @Field(() => ChatEventAvgAggregate, { nullable: true })
  _avg?: ChatEventAvgAggregate;

  @Field(() => ChatEventSumAggregate, { nullable: true })
  _sum?: ChatEventSumAggregate;

  @Field(() => ChatEventMinAggregate, { nullable: true })
  _min?: ChatEventMinAggregate;

  @Field(() => ChatEventMaxAggregate, { nullable: true })
  _max?: ChatEventMaxAggregate;
}
