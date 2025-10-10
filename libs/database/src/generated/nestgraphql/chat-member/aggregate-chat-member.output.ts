import { Field, ObjectType } from '@nestjs/graphql';

import { ChatMemberCountAggregate } from './chat-member-count-aggregate.output';
import { ChatMemberMaxAggregate } from './chat-member-max-aggregate.output';
import { ChatMemberMinAggregate } from './chat-member-min-aggregate.output';

@ObjectType()
export class AggregateChatMember {
  @Field(() => ChatMemberCountAggregate, { nullable: true })
  _count?: ChatMemberCountAggregate;

  @Field(() => ChatMemberMinAggregate, { nullable: true })
  _min?: ChatMemberMinAggregate;

  @Field(() => ChatMemberMaxAggregate, { nullable: true })
  _max?: ChatMemberMaxAggregate;
}
