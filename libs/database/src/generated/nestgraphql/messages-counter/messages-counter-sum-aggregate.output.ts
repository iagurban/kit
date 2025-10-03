import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessagesCounterSumAggregate {
  @Field(() => String, { nullable: true })
  lastNn?: bigint | number;
}
