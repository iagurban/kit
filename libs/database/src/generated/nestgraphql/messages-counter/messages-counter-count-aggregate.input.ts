import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessagesCounterCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  chatId?: true;

  @Field(() => Boolean, { nullable: true })
  lastNn?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
