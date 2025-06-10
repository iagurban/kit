import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import * as Scalars from 'graphql-scalars';

import { TaskState } from '../prisma/task-state.enum';
import { TaskHistoryValue } from '../task-history-value/task-history-value.model';
import { User } from '../user/user.model';
import { UserInTask } from '../user-in-task/user-in-task.model';
import { TaskCount } from './task-count.output';

@ObjectType()
export class Task {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => TaskState, { defaultValue: 'Pending', nullable: false })
  state!: `${TaskState}`;

  @Field(() => Boolean, { defaultValue: false, nullable: false })
  archived!: boolean;

  @Field(() => Float, { defaultValue: 0.5, nullable: false })
  impact!: number;

  @Field(() => Float, { defaultValue: 0.5, nullable: false })
  ease!: number;

  @Field(() => Scalars.GraphQLDate, { nullable: true })
  startAfterDate!: Date | null;

  @Field(() => Int, { nullable: true })
  startAfterOffset!: number | null;

  @Field(() => Scalars.GraphQLDate, { nullable: true })
  plannedStartDate!: Date | null;

  @Field(() => Int, { nullable: true })
  plannedStartOffset!: number | null;

  @Field(() => Scalars.GraphQLDate, { nullable: true })
  dueToDate!: Date | null;

  @Field(() => Int, { nullable: true })
  dueToOffset!: number | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => String, { nullable: true })
  responsibleId!: string | null;

  @Field(() => String, { nullable: true })
  parentId!: string | null;

  @Field(() => String, { nullable: false })
  orderKey!: string;

  @Field(() => User, { nullable: false })
  author?: User;

  @Field(() => User, { nullable: true })
  responsible?: User | null;

  @Field(() => Task, { nullable: true })
  parent?: Task | null;

  @Field(() => [Task], { nullable: true })
  children?: Array<Task>;

  @Field(() => [UserInTask], { nullable: true })
  participants?: Array<UserInTask>;

  @Field(() => [TaskHistoryValue], { nullable: true })
  historyValues?: Array<TaskHistoryValue>;

  @Field(() => TaskCount, { nullable: false })
  _count?: TaskCount;
}
