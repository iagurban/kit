import { Field, ObjectType } from '@nestjs/graphql';

import { ChatRoleCountAggregate } from './chat-role-count-aggregate.output';
import { ChatRoleMaxAggregate } from './chat-role-max-aggregate.output';
import { ChatRoleMinAggregate } from './chat-role-min-aggregate.output';

@ObjectType()
export class AggregateChatRole {
  @Field(() => ChatRoleCountAggregate, { nullable: true })
  _count?: ChatRoleCountAggregate;

  @Field(() => ChatRoleMinAggregate, { nullable: true })
  _min?: ChatRoleMinAggregate;

  @Field(() => ChatRoleMaxAggregate, { nullable: true })
  _max?: ChatRoleMaxAggregate;
}
