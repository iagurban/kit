import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessagesCounterMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  chatId?: true;

  @Field(() => Boolean, { nullable: true })
  lastNn?: true;
}
