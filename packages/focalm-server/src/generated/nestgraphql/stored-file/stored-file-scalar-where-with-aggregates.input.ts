import { Field, InputType } from '@nestjs/graphql';

import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class StoredFileScalarWhereWithAggregatesInput {
  @Field(() => [StoredFileScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<StoredFileScalarWhereWithAggregatesInput>;

  @Field(() => [StoredFileScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<StoredFileScalarWhereWithAggregatesInput>;

  @Field(() => [StoredFileScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<StoredFileScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  hash?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  size?: IntWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter;
}
