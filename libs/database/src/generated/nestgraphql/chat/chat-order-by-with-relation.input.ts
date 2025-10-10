import { Field, InputType } from '@nestjs/graphql';

import { ChatEventOrderByRelationAggregateInput } from '../chat-event/chat-event-order-by-relation-aggregate.input';
import { ChatEventsCounterOrderByWithRelationInput } from '../chat-events-counter/chat-events-counter-order-by-with-relation.input';
import { ChatMemberOrderByRelationAggregateInput } from '../chat-member/chat-member-order-by-relation-aggregate.input';
import { ChatRoleOrderByRelationAggregateInput } from '../chat-role/chat-role-order-by-relation-aggregate.input';
import { ChatRoleOrderByWithRelationInput } from '../chat-role/chat-role-order-by-with-relation.input';
import { MessagesCounterOrderByWithRelationInput } from '../messages-counter/messages-counter-order-by-with-relation.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { UserChatPermissionsOrderByRelationAggregateInput } from '../user-chat-permissions/user-chat-permissions-order-by-relation-aggregate.input';
import { ChatOrderByRelevanceInput } from './chat-order-by-relevance.input';

@InputType()
export class ChatOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  title?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  bio?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  avatar?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  ownerId?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  defaultRoleId?: SortOrderInput;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  owner?: UserOrderByWithRelationInput;

  @Field(() => ChatEventOrderByRelationAggregateInput, { nullable: true })
  events?: ChatEventOrderByRelationAggregateInput;

  @Field(() => ChatEventsCounterOrderByWithRelationInput, { nullable: true })
  eventsCounter?: ChatEventsCounterOrderByWithRelationInput;

  @Field(() => MessagesCounterOrderByWithRelationInput, { nullable: true })
  messagesCounter?: MessagesCounterOrderByWithRelationInput;

  @Field(() => ChatRoleOrderByWithRelationInput, { nullable: true })
  defaultRole?: ChatRoleOrderByWithRelationInput;

  @Field(() => UserChatPermissionsOrderByRelationAggregateInput, { nullable: true })
  userPermissions?: UserChatPermissionsOrderByRelationAggregateInput;

  @Field(() => ChatRoleOrderByRelationAggregateInput, { nullable: true })
  roles?: ChatRoleOrderByRelationAggregateInput;

  @Field(() => ChatMemberOrderByRelationAggregateInput, { nullable: true })
  members?: ChatMemberOrderByRelationAggregateInput;

  @Field(() => ChatOrderByRelevanceInput, { nullable: true })
  _relevance?: ChatOrderByRelevanceInput;
}
