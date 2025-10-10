import { Field, InputType } from '@nestjs/graphql';

import { ChatOrderByWithRelationInput } from '../chat/chat-order-by-with-relation.input';
import { ChatRoleOrderByWithRelationInput } from '../chat-role/chat-role-order-by-with-relation.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { UserChatPermissionsOrderByRelevanceInput } from './user-chat-permissions-order-by-relevance.input';

@InputType()
export class UserChatPermissionsOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  userId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  roleId?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  permissions?: SortOrderInput;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  user?: UserOrderByWithRelationInput;

  @Field(() => ChatOrderByWithRelationInput, { nullable: true })
  chat?: ChatOrderByWithRelationInput;

  @Field(() => ChatRoleOrderByWithRelationInput, { nullable: true })
  role?: ChatRoleOrderByWithRelationInput;

  @Field(() => UserChatPermissionsOrderByRelevanceInput, { nullable: true })
  _relevance?: UserChatPermissionsOrderByRelevanceInput;
}
