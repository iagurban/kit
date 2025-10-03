import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatEventsCounterCreateManyInput {
  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: true })
  lastNn?: bigint | number;
}
