import { Field, Float, InputType, Int } from '@nestjs/graphql';
import * as Scalars from 'graphql-scalars';

import { TaskState } from '../prisma/task-state.enum';
import { TaskHistoryValueUncheckedCreateNestedManyWithoutTaskInput } from '../task-history-value/task-history-value-unchecked-create-nested-many-without-task.input';
import { UserInTaskUncheckedCreateNestedManyWithoutTaskInput } from '../user-in-task/user-in-task-unchecked-create-nested-many-without-task.input';
import { TaskUncheckedCreateNestedManyWithoutParentInput } from './task-unchecked-create-nested-many-without-parent.input';

@InputType()
export class TaskUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => TaskState, { nullable: true })
  state?: `${TaskState}`;

  @Field(() => Boolean, { nullable: true })
  archived?: boolean;

  @Field(() => Float, { nullable: true })
  impact?: number;

  @Field(() => Float, { nullable: true })
  ease?: number;

  @Field(() => Scalars.GraphQLDate, { nullable: true })
  startAfterDate?: Date | string;

  @Field(() => Int, { nullable: true })
  startAfterOffset?: number;

  @Field(() => Scalars.GraphQLDate, { nullable: true })
  plannedStartDate?: Date | string;

  @Field(() => Int, { nullable: true })
  plannedStartOffset?: number;

  @Field(() => Scalars.GraphQLDate, { nullable: true })
  dueToDate?: Date | string;

  @Field(() => Int, { nullable: true })
  dueToOffset?: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => String, { nullable: true })
  responsibleId?: string;

  @Field(() => String, { nullable: true })
  parentId?: string;

  @Field(() => String, { nullable: false })
  orderKey!: string;

  @Field(() => TaskUncheckedCreateNestedManyWithoutParentInput, { nullable: true })
  children?: TaskUncheckedCreateNestedManyWithoutParentInput;

  @Field(() => UserInTaskUncheckedCreateNestedManyWithoutTaskInput, { nullable: true })
  participants?: UserInTaskUncheckedCreateNestedManyWithoutTaskInput;

  @Field(() => TaskHistoryValueUncheckedCreateNestedManyWithoutTaskInput, { nullable: true })
  historyValues?: TaskHistoryValueUncheckedCreateNestedManyWithoutTaskInput;
}
