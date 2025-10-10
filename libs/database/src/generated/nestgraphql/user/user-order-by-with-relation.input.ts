import { Field, InputType } from '@nestjs/graphql';

import { ChatOrderByRelationAggregateInput } from '../chat/chat-order-by-relation-aggregate.input';
import { ChatEventOrderByRelationAggregateInput } from '../chat-event/chat-event-order-by-relation-aggregate.input';
import { ChatMemberOrderByRelationAggregateInput } from '../chat-member/chat-member-order-by-relation-aggregate.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { RefreshTokenOrderByRelationAggregateInput } from '../refresh-token/refresh-token-order-by-relation-aggregate.input';
import { StoredFileOrderByRelationAggregateInput } from '../stored-file/stored-file-order-by-relation-aggregate.input';
import { UserChatPermissionsOrderByRelationAggregateInput } from '../user-chat-permissions/user-chat-permissions-order-by-relation-aggregate.input';
import { UserOrderByRelevanceInput } from './user-order-by-relevance.input';

@InputType()
export class UserOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  email?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  name?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  abbrev?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  passwordHash?: `${SortOrder}`;

  @Field(() => StoredFileOrderByRelationAggregateInput, { nullable: true })
  uploadedFiles?: StoredFileOrderByRelationAggregateInput;

  @Field(() => RefreshTokenOrderByRelationAggregateInput, { nullable: true })
  refreshTokens?: RefreshTokenOrderByRelationAggregateInput;

  @Field(() => ChatEventOrderByRelationAggregateInput, { nullable: true })
  chatEvents?: ChatEventOrderByRelationAggregateInput;

  @Field(() => UserChatPermissionsOrderByRelationAggregateInput, { nullable: true })
  chatsPermissions?: UserChatPermissionsOrderByRelationAggregateInput;

  @Field(() => ChatMemberOrderByRelationAggregateInput, { nullable: true })
  chatsMmbership?: ChatMemberOrderByRelationAggregateInput;

  @Field(() => ChatOrderByRelationAggregateInput, { nullable: true })
  ownChats?: ChatOrderByRelationAggregateInput;

  @Field(() => UserOrderByRelevanceInput, { nullable: true })
  _relevance?: UserOrderByRelevanceInput;
}
