import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  title!: number;

  @Field(() => Int, { nullable: false })
  state!: number;

  @Field(() => Int, { nullable: false })
  archived!: number;

  @Field(() => Int, { nullable: false })
  impact!: number;

  @Field(() => Int, { nullable: false })
  ease!: number;

  @Field(() => Int, { nullable: false })
  startAfterDate!: number;

  @Field(() => Int, { nullable: false })
  startAfterOffset!: number;

  @Field(() => Int, { nullable: false })
  plannedStartDate!: number;

  @Field(() => Int, { nullable: false })
  plannedStartOffset!: number;

  @Field(() => Int, { nullable: false })
  dueToDate!: number;

  @Field(() => Int, { nullable: false })
  dueToOffset!: number;

  @Field(() => Int, { nullable: false })
  createdAt!: number;

  @Field(() => Int, { nullable: false })
  updatedAt!: number;

  @Field(() => Int, { nullable: false })
  authorId!: number;

  @Field(() => Int, { nullable: false })
  responsibleId!: number;

  @Field(() => Int, { nullable: false })
  parentId!: number;

  @Field(() => Int, { nullable: false })
  description!: number;

  @Field(() => Int, { nullable: false })
  orderKey!: number;

  @Field(() => Int, { nullable: false })
  projectId!: number;

  @Field(() => Int, { nullable: false })
  nnInProject!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
