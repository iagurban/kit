import { Field, InputType } from '@nestjs/graphql';

import { BoolFilter } from '../prisma/bool-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { EnumTaskStateFilter } from '../prisma/enum-task-state-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
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
  startAfter?: DateTimeNullableFilter;

  @Field(() => DateTimeNullableFilter, { nullable: true })
  plannedStart?: DateTimeNullableFilter;

  @Field(() => DateTimeNullableFilter, { nullable: true })
  dueTo?: DateTimeNullableFilter;

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
}
