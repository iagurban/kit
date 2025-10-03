import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessagesCounterCreateWithoutChatInput {
  @Field(() => String, { nullable: true })
  lastNn?: bigint | number;
}
