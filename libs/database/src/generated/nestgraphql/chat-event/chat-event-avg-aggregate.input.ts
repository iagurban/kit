import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatEventAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  nn?: true;
}
