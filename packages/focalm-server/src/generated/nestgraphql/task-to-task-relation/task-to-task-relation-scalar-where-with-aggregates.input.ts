import { Field, InputType } from '@nestjs/graphql';

import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class TaskToTaskRelationScalarWhereWithAggregatesInput {
  @Field(() => [TaskToTaskRelationScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<TaskToTaskRelationScalarWhereWithAggregatesInput>;

  @Field(() => [TaskToTaskRelationScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<TaskToTaskRelationScalarWhereWithAggregatesInput>;

  @Field(() => [TaskToTaskRelationScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<TaskToTaskRelationScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  srcId?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  dstId?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  typeId?: UuidWithAggregatesFilter;
}
