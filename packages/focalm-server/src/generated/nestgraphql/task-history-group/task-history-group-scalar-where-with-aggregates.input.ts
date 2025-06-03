import { Field, InputType } from '@nestjs/graphql';

import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { EnumCreatedAtFixReasonNullableWithAggregatesFilter } from '../prisma/enum-created-at-fix-reason-nullable-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class TaskHistoryGroupScalarWhereWithAggregatesInput {
  @Field(() => [TaskHistoryGroupScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<TaskHistoryGroupScalarWhereWithAggregatesInput>;

  @Field(() => [TaskHistoryGroupScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<TaskHistoryGroupScalarWhereWithAggregatesInput>;

  @Field(() => [TaskHistoryGroupScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<TaskHistoryGroupScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  taskId?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  authorId?: UuidWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  localCreatedAt?: DateTimeWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter;

  @Field(() => EnumCreatedAtFixReasonNullableWithAggregatesFilter, { nullable: true })
  createdAtFixReason?: EnumCreatedAtFixReasonNullableWithAggregatesFilter;
}
