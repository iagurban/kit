import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessagesCounterSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  lastNn?: true;
}
