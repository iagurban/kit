import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatEventSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  nn?: true;
}
