import { Field, InputType } from '@nestjs/graphql';

import { BigIntWithAggregatesFilter } from '../prisma/big-int-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class ProjectScalarWhereWithAggregatesInput {
  @Field(() => [ProjectScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ProjectScalarWhereWithAggregatesInput>;

  @Field(() => [ProjectScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ProjectScalarWhereWithAggregatesInput>;

  @Field(() => [ProjectScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ProjectScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => BigIntWithAggregatesFilter, { nullable: true })
  tasksCounter?: BigIntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  abbrev?: StringNullableWithAggregatesFilter;
}
