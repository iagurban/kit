import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatEventsCounterAvgAggregate {
  @Field(() => Float, { nullable: true })
  lastNn?: number;
}
