import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskSumAggregate {
  @Field(() => Float, { nullable: true })
  impact?: number;

  @Field(() => Float, { nullable: true })
  ease?: number;

  @Field(() => Int, { nullable: true })
  startAfterOffset?: number;

  @Field(() => Int, { nullable: true })
  plannedStartOffset?: number;

  @Field(() => Int, { nullable: true })
  dueToOffset?: number;
}
