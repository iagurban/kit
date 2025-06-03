import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskSumAggregate {
  @Field(() => Float, { nullable: true })
  impact?: number;

  @Field(() => Float, { nullable: true })
  ease?: number;
}
