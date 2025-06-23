import { Field, InputType } from '@nestjs/graphql';

import { BigIntFilter } from '../prisma/big-int-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { EnumTaskStateFilter } from '../prisma/enum-task-state-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UuidNullableFilter } from '../prisma/uuid-nullable-filter.input';

@InputType()
export class TaskScalarWhereInput {
  @Field(() => [TaskScalarWhereInput], { nullable: true })
  AND?: Array<TaskScalarWhereInput>;

  @Field(() => [TaskScalarWhereInput], { nullable: true })
  OR?: Array<TaskScalarWhereInput>;

  @Field(() => [TaskScalarWhereInput], { nullable: true })
  NOT?: Array<TaskScalarWhereInput>;

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

  @Field(() => JsonFilter, { nullable: true })
  description?: JsonFilter;

  @Field(() => StringFilter, { nullable: true })
  orderKey?: StringFilter;

  @Field(() => UuidFilter, { nullable: true })
  projectId?: UuidFilter;

  @Field(() => BigIntFilter, { nullable: true })
  nnInProject?: BigIntFilter;
}
