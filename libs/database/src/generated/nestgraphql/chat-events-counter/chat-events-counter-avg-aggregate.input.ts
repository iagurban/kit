import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatEventsCounterAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  lastNn?: true;
}
