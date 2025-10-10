import { Field, InputType } from '@nestjs/graphql';

import { ChatOrderByRelationAggregateInput } from '../chat/chat-order-by-relation-aggregate.input';
import { ChatOrderByWithRelationInput } from '../chat/chat-order-by-with-relation.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserChatPermissionsOrderByRelationAggregateInput } from '../user-chat-permissions/user-chat-permissions-order-by-relation-aggregate.input';
import { ChatRoleOrderByRelevanceInput } from './chat-role-order-by-relevance.input';

@InputType()
export class ChatRoleOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  name?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  tags?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  permissions?: `${SortOrder}`;

  @Field(() => ChatOrderByWithRelationInput, { nullable: true })
  chat?: ChatOrderByWithRelationInput;

  @Field(() => ChatOrderByRelationAggregateInput, { nullable: true })
  isDefaultForChats?: ChatOrderByRelationAggregateInput;

  @Field(() => UserChatPermissionsOrderByRelationAggregateInput, { nullable: true })
  userPermissions?: UserChatPermissionsOrderByRelationAggregateInput;

  @Field(() => ChatRoleOrderByRelevanceInput, { nullable: true })
  _relevance?: ChatRoleOrderByRelevanceInput;
}
