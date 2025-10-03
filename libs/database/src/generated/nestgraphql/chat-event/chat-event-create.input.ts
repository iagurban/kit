import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatCreateNestedOneWithoutEventsInput } from '../chat/chat-create-nested-one-without-events.input';
import { UserCreateNestedOneWithoutChatEventsInput } from '../user/user-create-nested-one-without-chat-events.input';

@InputType()
export class ChatEventCreateInput {
  @Field(() => String, { nullable: true })
  id?: bigint | number;

  @Field(() => String, { nullable: false })
  nn!: bigint | number;

  @Field(() => String, { nullable: false })
  type!: string;

  @Field(() => GraphQLJSON, { nullable: false })
  payload!: any;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => ChatCreateNestedOneWithoutEventsInput, { nullable: false })
  chat!: ChatCreateNestedOneWithoutEventsInput;

  @Field(() => UserCreateNestedOneWithoutChatEventsInput, { nullable: false })
  author!: UserCreateNestedOneWithoutChatEventsInput;
}
