import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessagesCounterAvgAggregate {
  @Field(() => Float, { nullable: true })
  lastNn?: number;
}
