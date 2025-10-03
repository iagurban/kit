import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatEventsCounterCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  chatId?: true;

  @Field(() => Boolean, { nullable: true })
  lastNn?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
