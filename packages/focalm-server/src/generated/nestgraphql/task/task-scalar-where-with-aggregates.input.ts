import { Field, InputType } from '@nestjs/graphql';

import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';
import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { EnumTaskStateWithAggregatesFilter } from '../prisma/enum-task-state-with-aggregates-filter.input';
import { FloatWithAggregatesFilter } from '../prisma/float-with-aggregates-filter.input';
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
  startAfter?: DateTimeNullableWithAggregatesFilter;

  @Field(() => DateTimeNullableWithAggregatesFilter, { nullable: true })
  plannedStart?: DateTimeNullableWithAggregatesFilter;

  @Field(() => DateTimeNullableWithAggregatesFilter, { nullable: true })
  dueTo?: DateTimeNullableWithAggregatesFilter;

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

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  orderKey?: StringWithAggregatesFilter;
}
