import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatEventsCounterSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  lastNn?: true;
}
