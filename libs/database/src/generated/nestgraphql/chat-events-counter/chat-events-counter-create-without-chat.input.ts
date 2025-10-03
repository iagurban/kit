import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatEventsCounterCreateWithoutChatInput {
  @Field(() => String, { nullable: true })
  lastNn?: bigint | number;
}
