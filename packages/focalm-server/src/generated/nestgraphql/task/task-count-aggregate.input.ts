import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  title?: true;

  @Field(() => Boolean, { nullable: true })
  state?: true;

  @Field(() => Boolean, { nullable: true })
  archived?: true;

  @Field(() => Boolean, { nullable: true })
  impact?: true;

  @Field(() => Boolean, { nullable: true })
  ease?: true;

  @Field(() => Boolean, { nullable: true })
  startAfterDate?: true;

  @Field(() => Boolean, { nullable: true })
  startAfterOffset?: true;

  @Field(() => Boolean, { nullable: true })
  plannedStartDate?: true;

  @Field(() => Boolean, { nullable: true })
  plannedStartOffset?: true;

  @Field(() => Boolean, { nullable: true })
  dueToDate?: true;

  @Field(() => Boolean, { nullable: true })
  dueToOffset?: true;

  @Field(() => Boolean, { nullable: true })
  createdAt?: true;

  @Field(() => Boolean, { nullable: true })
  updatedAt?: true;

  @Field(() => Boolean, { nullable: true })
  authorId?: true;

  @Field(() => Boolean, { nullable: true })
  responsibleId?: true;

  @Field(() => Boolean, { nullable: true })
  parentId?: true;

  @Field(() => Boolean, { nullable: true })
  description?: true;

  @Field(() => Boolean, { nullable: true })
  orderKey?: true;

  @Field(() => Boolean, { nullable: true })
  projectId?: true;

  @Field(() => Boolean, { nullable: true })
  nnInProject?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
