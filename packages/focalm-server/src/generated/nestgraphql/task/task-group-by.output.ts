import { Field, Float, ObjectType } from '@nestjs/graphql';

import { TaskState } from '../prisma/task-state.enum';
import { TaskAvgAggregate } from './task-avg-aggregate.output';
import { TaskCountAggregate } from './task-count-aggregate.output';
import { TaskMaxAggregate } from './task-max-aggregate.output';
import { TaskMinAggregate } from './task-min-aggregate.output';
import { TaskSumAggregate } from './task-sum-aggregate.output';

@ObjectType()
export class TaskGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => TaskState, { nullable: false })
  state!: `${TaskState}`;

  @Field(() => Boolean, { nullable: false })
  archived!: boolean;

  @Field(() => Float, { nullable: false })
  impact!: number;

  @Field(() => Float, { nullable: false })
  ease!: number;

  @Field(() => Date, { nullable: true })
  startAfter?: Date | string;

  @Field(() => Date, { nullable: true })
  plannedStart?: Date | string;

  @Field(() => Date, { nullable: true })
  dueTo?: Date | string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date | string;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => String, { nullable: true })
  responsibleId?: string;

  @Field(() => String, { nullable: true })
  parentId?: string;

  @Field(() => String, { nullable: false })
  orderKey!: string;

  @Field(() => TaskCountAggregate, { nullable: true })
  _count?: TaskCountAggregate;

  @Field(() => TaskAvgAggregate, { nullable: true })
  _avg?: TaskAvgAggregate;

  @Field(() => TaskSumAggregate, { nullable: true })
  _sum?: TaskSumAggregate;

  @Field(() => TaskMinAggregate, { nullable: true })
  _min?: TaskMinAggregate;

  @Field(() => TaskMaxAggregate, { nullable: true })
  _max?: TaskMaxAggregate;
}
