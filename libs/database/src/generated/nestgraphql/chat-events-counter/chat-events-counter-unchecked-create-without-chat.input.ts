import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatEventsCounterUncheckedCreateWithoutChatInput {
  @Field(() => String, { nullable: true })
  lastNn?: bigint | number;
}
