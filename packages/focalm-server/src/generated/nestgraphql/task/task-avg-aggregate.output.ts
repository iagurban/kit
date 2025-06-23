import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskAvgAggregate {
  @Field(() => Float, { nullable: true })
  impact?: number;

  @Field(() => Float, { nullable: true })
  ease?: number;

  @Field(() => Float, { nullable: true })
  startAfterOffset?: number;

  @Field(() => Float, { nullable: true })
  plannedStartOffset?: number;

  @Field(() => Float, { nullable: true })
  dueToOffset?: number;

  @Field(() => Float, { nullable: true })
  nnInProject?: number;
}
