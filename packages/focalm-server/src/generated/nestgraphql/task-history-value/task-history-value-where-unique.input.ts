import { Field, InputType } from '@nestjs/graphql';

import { EnumTaskHistoryKeyFilter } from '../prisma/enum-task-history-key-filter.input';
import { EnumTaskHistoryOperationFilter } from '../prisma/enum-task-history-operation-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { TaskScalarRelationFilter } from '../task/task-scalar-relation-filter.input';
import { TaskHistoryGroupScalarRelationFilter } from '../task-history-group/task-history-group-scalar-relation-filter.input';
import { TaskHistoryValueWhereInput } from './task-history-value-where.input';

@InputType()
export class TaskHistoryValueWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [TaskHistoryValueWhereInput], { nullable: true })
  AND?: Array<TaskHistoryValueWhereInput>;

  @Field(() => [TaskHistoryValueWhereInput], { nullable: true })
  OR?: Array<TaskHistoryValueWhereInput>;

  @Field(() => [TaskHistoryValueWhereInput], { nullable: true })
  NOT?: Array<TaskHistoryValueWhereInput>;

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

  @Field(() => TaskHistoryGroupScalarRelationFilter, { nullable: true })
  group?: TaskHistoryGroupScalarRelationFilter;

  @Field(() => TaskScalarRelationFilter, { nullable: true })
  task?: TaskScalarRelationFilter;
}
