import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessagesCounterMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  chatId?: true;

  @Field(() => Boolean, { nullable: true })
  lastNn?: true;
}
