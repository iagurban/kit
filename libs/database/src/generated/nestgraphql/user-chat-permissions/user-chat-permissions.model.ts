import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { Chat } from '../chat/chat.model';
import { ChatRole } from '../chat-role/chat-role.model';
import { User } from '../user/user.model';

@ObjectType()
export class UserChatPermissions {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: true })
  roleId!: string | null;

  @Field(() => GraphQLJSON, { nullable: true })
  permissions!: any | null;

  @Field(() => User, { nullable: false })
  user?: User;

  @Field(() => Chat, { nullable: false })
  chat?: Chat;

  @Field(() => ChatRole, { nullable: true })
  role?: ChatRole | null;
}
