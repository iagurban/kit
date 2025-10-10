import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { Chat } from '../chat/chat.model';
import { ChatRoleTag } from '../prisma/chat-role-tag.enum';
import { UserChatPermissions } from '../user-chat-permissions/user-chat-permissions.model';
import { ChatRoleCount } from './chat-role-count.output';

@ObjectType()
export class ChatRole {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [ChatRoleTag], { nullable: true })
  tags!: Array<`${ChatRoleTag}`>;

  @Field(() => GraphQLJSON, { nullable: false })
  permissions!: any;

  @Field(() => Chat, { nullable: false })
  chat?: Chat;

  @Field(() => [Chat], { nullable: true })
  isDefaultForChats?: Array<Chat>;

  @Field(() => [UserChatPermissions], { nullable: true })
  userPermissions?: Array<UserChatPermissions>;

  @Field(() => ChatRoleCount, { nullable: false })
  _count?: ChatRoleCount;
}
