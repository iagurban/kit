import { Field, InputType } from '@nestjs/graphql';

import { ChatCreateNestedOneWithoutMembersInput } from '../chat/chat-create-nested-one-without-members.input';
import { UserCreateNestedOneWithoutChatsMmbershipInput } from '../user/user-create-nested-one-without-chats-mmbership.input';

@InputType()
export class ChatMemberCreateInput {
  @Field(() => Date, { nullable: true })
  joinedAt?: Date | string;

  @Field(() => UserCreateNestedOneWithoutChatsMmbershipInput, { nullable: false })
  user!: UserCreateNestedOneWithoutChatsMmbershipInput;

  @Field(() => ChatCreateNestedOneWithoutMembersInput, { nullable: false })
  chat!: ChatCreateNestedOneWithoutMembersInput;
}
