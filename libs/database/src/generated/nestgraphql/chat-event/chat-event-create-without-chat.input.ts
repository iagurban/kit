import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { UserCreateNestedOneWithoutChatEventsInput } from '../user/user-create-nested-one-without-chat-events.input';

@InputType()
export class ChatEventCreateWithoutChatInput {
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

  @Field(() => UserCreateNestedOneWithoutChatEventsInput, { nullable: false })
  author!: UserCreateNestedOneWithoutChatEventsInput;
}
