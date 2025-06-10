import { Field, InputType } from '@nestjs/graphql';

import { EnumTaskHistoryKeyFilter } from '../prisma/enum-task-history-key-filter.input';
import { EnumTaskHistoryOperationFilter } from '../prisma/enum-task-history-operation-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class TaskHistoryValueScalarWhereInput {
  @Field(() => [TaskHistoryValueScalarWhereInput], { nullable: true })
  AND?: Array<TaskHistoryValueScalarWhereInput>;

  @Field(() => [TaskHistoryValueScalarWhereInput], { nullable: true })
  OR?: Array<TaskHistoryValueScalarWhereInput>;

  @Field(() => [TaskHistoryValueScalarWhereInput], { nullable: true })
  NOT?: Array<TaskHistoryValueScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  groupId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  taskId?: UuidFilter;

  @Field(() => EnumTaskHistoryKeyFilter, { nullable: true })
  key?: EnumTaskHistoryKeyFilter;

  @Field(() => EnumTaskHistoryOperationFilter, { nullable: true })
  op?: EnumTaskHistoryOperationFilter;

  @Field(() => JsonFilter, { nullable: true })
  value?: JsonFilter;
}
