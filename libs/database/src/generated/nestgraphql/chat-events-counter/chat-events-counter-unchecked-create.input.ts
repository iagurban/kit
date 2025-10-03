import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatEventsCounterUncheckedCreateInput {
  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: true })
  lastNn?: bigint | number;
}
