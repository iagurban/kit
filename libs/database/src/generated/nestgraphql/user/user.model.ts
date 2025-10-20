import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Chat } from '../chat/chat.model';
import { ChatEvent } from '../chat-event/chat-event.model';
import { ChatMember } from '../chat-member/chat-member.model';
import { RefreshToken } from '../refresh-token/refresh-token.model';
import { StoredFile } from '../stored-file/stored-file.model';
import { UserChatPermissions } from '../user-chat-permissions/user-chat-permissions.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  abbrev!: string | null;

  @Field(() => [StoredFile], { nullable: true })
  uploadedFiles?: Array<StoredFile>;

  @Field(() => [ChatEvent], { nullable: true })
  chatEvents?: Array<ChatEvent>;

  @Field(() => [UserChatPermissions], { nullable: true })
  chatsPermissions?: Array<UserChatPermissions>;

  @Field(() => [ChatMember], { nullable: true })
  chatsMmbership?: Array<ChatMember>;

  @Field(() => [Chat], { nullable: true })
  ownChats?: Array<Chat>;

  @Field(() => [RefreshToken], { nullable: true })
  RefreshToken?: Array<RefreshToken>;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;
}
