import { Field, InputType } from '@nestjs/graphql';

import { ChatCreateNestedOneWithoutMembersInput } from '../chat/chat-create-nested-one-without-members.input';

@InputType()
export class ChatMemberCreateWithoutUserInput {
  @Field(() => Date, { nullable: true })
  joinedAt?: Date | string;

  @Field(() => ChatCreateNestedOneWithoutMembersInput, { nullable: false })
  chat!: ChatCreateNestedOneWithoutMembersInput;
}
