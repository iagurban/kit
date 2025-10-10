import { Field, InputType } from '@nestjs/graphql';

import { UserCreateNestedOneWithoutChatsMmbershipInput } from '../user/user-create-nested-one-without-chats-mmbership.input';

@InputType()
export class ChatMemberCreateWithoutChatInput {
  @Field(() => Date, { nullable: true })
  joinedAt?: Date | string;

  @Field(() => UserCreateNestedOneWithoutChatsMmbershipInput, { nullable: false })
  user!: UserCreateNestedOneWithoutChatsMmbershipInput;
}
