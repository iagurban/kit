import { Field, InputType } from '@nestjs/graphql';

import { BigIntWithAggregatesFilter } from '../prisma/big-int-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { EnumTaskStateWithAggregatesFilter } from '../prisma/enum-task-state-with-aggregates-filter.input';
import { FloatWithAggregatesFilter } from '../prisma/float-with-aggregates-filter.input';
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input';
import { JsonWithAggregatesFilter } from '../prisma/json-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { UuidNullableWithAggregatesFilter } from '../prisma/uuid-nullable-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class TaskScalarWhereWithAggregatesInput {
  @Field(() => [TaskScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<TaskScalarWhereWithAggregatesInput>;

  @Field(() => [TaskScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<TaskScalarWhereWithAggregatesInput>;

  @Field(() => [TaskScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<TaskScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  title?: StringWithAggregatesFilter;

  @Field(() => EnumTaskStateWithAggregatesFilter, { nullable: true })
  state?: EnumTaskStateWithAggregatesFilter;

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  archived?: BoolWithAggregatesFilter;

  @Field(() => FloatWithAggregatesFilter, { nullable: true })
  impact?: FloatWithAggregatesFilter;

  @Field(() => FloatWithAggregatesFilter, { nullable: true })
  ease?: FloatWithAggregatesFilter;

  @Field(() => DateTimeNullableWithAggregatesFilter, { nullable: true })
  startAfterDate?: DateTimeNullableWithAggregatesFilter;

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  startAfterOffset?: IntNullableWithAggregatesFilter;

  @Field(() => DateTimeNullableWithAggregatesFilter, { nullable: true })
  plannedStartDate?: DateTimeNullableWithAggregatesFilter;

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  plannedStartOffset?: IntNullableWithAggregatesFilter;

  @Field(() => DateTimeNullableWithAggregatesFilter, { nullable: true })
  dueToDate?: DateTimeNullableWithAggregatesFilter;

  @Field(() => IntNullableWithAggregatesFilter, { nullable: true })
  dueToOffset?: IntNullableWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  authorId?: UuidWithAggregatesFilter;

  @Field(() => UuidNullableWithAggregatesFilter, { nullable: true })
  responsibleId?: UuidNullableWithAggregatesFilter;

  @Field(() => UuidNullableWithAggregatesFilter, { nullable: true })
  parentId?: UuidNullableWithAggregatesFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  description?: JsonWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  orderKey?: StringWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  projectId?: UuidWithAggregatesFilter;

  @Field(() => BigIntWithAggregatesFilter, { nullable: true })
  nnInProject?: BigIntWithAggregatesFilter;
}
