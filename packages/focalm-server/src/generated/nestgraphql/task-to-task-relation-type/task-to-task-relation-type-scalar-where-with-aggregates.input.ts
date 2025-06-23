import { Field, InputType } from '@nestjs/graphql';

import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class TaskToTaskRelationTypeScalarWhereWithAggregatesInput {
  @Field(() => [TaskToTaskRelationTypeScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<TaskToTaskRelationTypeScalarWhereWithAggregatesInput>;

  @Field(() => [TaskToTaskRelationTypeScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<TaskToTaskRelationTypeScalarWhereWithAggregatesInput>;

  @Field(() => [TaskToTaskRelationTypeScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<TaskToTaskRelationTypeScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  forward?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  inverse?: StringWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  projectId?: UuidWithAggregatesFilter;
}
