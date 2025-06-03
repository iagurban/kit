import { Field, InputType } from '@nestjs/graphql';

import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class TagScalarWhereWithAggregatesInput {
  @Field(() => [TagScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<TagScalarWhereWithAggregatesInput>;

  @Field(() => [TagScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<TagScalarWhereWithAggregatesInput>;

  @Field(() => [TagScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<TagScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  menuId?: UuidWithAggregatesFilter;
}
