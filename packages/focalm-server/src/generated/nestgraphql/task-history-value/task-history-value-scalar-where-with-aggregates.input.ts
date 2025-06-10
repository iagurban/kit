import { Field, InputType } from '@nestjs/graphql';

import { EnumTaskHistoryKeyWithAggregatesFilter } from '../prisma/enum-task-history-key-with-aggregates-filter.input';
import { EnumTaskHistoryOperationWithAggregatesFilter } from '../prisma/enum-task-history-operation-with-aggregates-filter.input';
import { JsonWithAggregatesFilter } from '../prisma/json-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class TaskHistoryValueScalarWhereWithAggregatesInput {
  @Field(() => [TaskHistoryValueScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<TaskHistoryValueScalarWhereWithAggregatesInput>;

  @Field(() => [TaskHistoryValueScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<TaskHistoryValueScalarWhereWithAggregatesInput>;

  @Field(() => [TaskHistoryValueScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<TaskHistoryValueScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  groupId?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  taskId?: UuidWithAggregatesFilter;

  @Field(() => EnumTaskHistoryKeyWithAggregatesFilter, { nullable: true })
  key?: EnumTaskHistoryKeyWithAggregatesFilter;

  @Field(() => EnumTaskHistoryOperationWithAggregatesFilter, { nullable: true })
  op?: EnumTaskHistoryOperationWithAggregatesFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  value?: JsonWithAggregatesFilter;
}
