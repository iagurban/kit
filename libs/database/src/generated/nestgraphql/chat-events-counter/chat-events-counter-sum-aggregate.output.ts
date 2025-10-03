import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatEventsCounterSumAggregate {
  @Field(() => String, { nullable: true })
  lastNn?: bigint | number;
}
