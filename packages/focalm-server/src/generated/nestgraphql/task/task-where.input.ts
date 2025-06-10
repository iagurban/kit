import { Field, InputType } from '@nestjs/graphql';

import { BoolFilter } from '../prisma/bool-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { EnumTaskStateFilter } from '../prisma/enum-task-state-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UuidNullableFilter } from '../prisma/uuid-nullable-filter.input';
import { TaskHistoryValueListRelationFilter } from '../task-history-value/task-history-value-list-relation-filter.input';
import { UserNullableScalarRelationFilter } from '../user/user-nullable-scalar-relation-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';
import { UserInTaskListRelationFilter } from '../user-in-task/user-in-task-list-relation-filter.input';
import { TaskListRelationFilter } from './task-list-relation-filter.input';
import { TaskNullableScalarRelationFilter } from './task-nullable-scalar-relation-filter.input';

@InputType()
export class TaskWhereInput {
  @Field(() => [TaskWhereInput], { nullable: true })
  AND?: Array<TaskWhereInput>;

  @Field(() => [TaskWhereInput], { nullable: true })
  OR?: Array<TaskWhereInput>;

  @Field(() => [TaskWhereInput], { nullable: true })
  NOT?: Array<TaskWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => EnumTaskStateFilter, { nullable: true })
  state?: EnumTaskStateFilter;

  @Field(() => BoolFilter, { nullable: true })
  archived?: BoolFilter;

  @Field(() => FloatFilter, { nullable: true })
  impact?: FloatFilter;

  @Field(() => FloatFilter, { nullable: true })
  ease?: FloatFilter;

  @Field(() => DateTimeNullableFilter, { nullable: true })
  startAfterDate?: DateTimeNullableFilter;

  @Field(() => IntNullableFilter, { nullable: true })
  startAfterOffset?: IntNullableFilter;

  @Field(() => DateTimeNullableFilter, { nullable: true })
  plannedStartDate?: DateTimeNullableFilter;

  @Field(() => IntNullableFilter, { nullable: true })
  plannedStartOffset?: IntNullableFilter;

  @Field(() => DateTimeNullableFilter, { nullable: true })
  dueToDate?: DateTimeNullableFilter;

  @Field(() => IntNullableFilter, { nullable: true })
  dueToOffset?: IntNullableFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter;

  @Field(() => UuidFilter, { nullable: true })
  authorId?: UuidFilter;

  @Field(() => UuidNullableFilter, { nullable: true })
  responsibleId?: UuidNullableFilter;

  @Field(() => UuidNullableFilter, { nullable: true })
  parentId?: UuidNullableFilter;

  @Field(() => StringFilter, { nullable: true })
  orderKey?: StringFilter;

  @Field(() => UserScalarRelationFilter, { nullable: true })
  author?: UserScalarRelationFilter;

  @Field(() => UserNullableScalarRelationFilter, { nullable: true })
  responsible?: UserNullableScalarRelationFilter;

  @Field(() => TaskNullableScalarRelationFilter, { nullable: true })
  parent?: TaskNullableScalarRelationFilter;

  @Field(() => TaskListRelationFilter, { nullable: true })
  children?: TaskListRelationFilter;

  @Field(() => UserInTaskListRelationFilter, { nullable: true })
  participants?: UserInTaskListRelationFilter;

  @Field(() => TaskHistoryValueListRelationFilter, { nullable: true })
  historyValues?: TaskHistoryValueListRelationFilter;
}
