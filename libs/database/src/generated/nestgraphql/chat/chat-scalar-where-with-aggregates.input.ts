import { Field, InputType } from '@nestjs/graphql';

import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { UuidNullableWithAggregatesFilter } from '../prisma/uuid-nullable-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class ChatScalarWhereWithAggregatesInput {
  @Field(() => [ChatScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ChatScalarWhereWithAggregatesInput>;

  @Field(() => [ChatScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ChatScalarWhereWithAggregatesInput>;

  @Field(() => [ChatScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ChatScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  title?: StringWithAggregatesFilter;

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  bio?: StringNullableWithAggregatesFilter;

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  avatar?: StringNullableWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  ownerId?: UuidWithAggregatesFilter;

  @Field(() => UuidNullableWithAggregatesFilter, { nullable: true })
  defaultRoleId?: UuidNullableWithAggregatesFilter;
}
