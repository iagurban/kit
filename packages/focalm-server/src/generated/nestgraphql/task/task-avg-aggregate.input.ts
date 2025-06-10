import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  impact?: true;

  @Field(() => Boolean, { nullable: true })
  ease?: true;

  @Field(() => Boolean, { nullable: true })
  startAfterOffset?: true;

  @Field(() => Boolean, { nullable: true })
  plannedStartOffset?: true;

  @Field(() => Boolean, { nullable: true })
  dueToOffset?: true;
}
