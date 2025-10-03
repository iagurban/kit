import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessagesCounterAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  lastNn?: true;
}
