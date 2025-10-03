import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessagesCounterUncheckedCreateWithoutChatInput {
  @Field(() => String, { nullable: true })
  lastNn?: bigint | number;
}
