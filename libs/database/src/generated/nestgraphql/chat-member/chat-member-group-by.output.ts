import { Field, ObjectType } from '@nestjs/graphql';

import { ChatMemberCountAggregate } from './chat-member-count-aggregate.output';
import { ChatMemberMaxAggregate } from './chat-member-max-aggregate.output';
import { ChatMemberMinAggregate } from './chat-member-min-aggregate.output';

@ObjectType()
export class ChatMemberGroupBy {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => Date, { nullable: false })
  joinedAt!: Date | string;

  @Field(() => ChatMemberCountAggregate, { nullable: true })
  _count?: ChatMemberCountAggregate;

  @Field(() => ChatMemberMinAggregate, { nullable: true })
  _min?: ChatMemberMinAggregate;

  @Field(() => ChatMemberMaxAggregate, { nullable: true })
  _max?: ChatMemberMaxAggregate;
}
