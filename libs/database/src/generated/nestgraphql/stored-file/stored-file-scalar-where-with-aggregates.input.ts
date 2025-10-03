import { Field, InputType } from '@nestjs/graphql';

import { BigIntWithAggregatesFilter } from '../prisma/big-int-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { JsonNullableWithAggregatesFilter } from '../prisma/json-nullable-with-aggregates-filter.input';
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
  checksum?: StringWithAggregatesFilter;

  @Field(() => BigIntWithAggregatesFilter, { nullable: true })
  sizeBytes?: BigIntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  originalFilename?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  mimeType?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  storageKey?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  cdnUrl?: StringWithAggregatesFilter;

  @Field(() => JsonNullableWithAggregatesFilter, { nullable: true })
  metadata?: JsonNullableWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  uploadedByUserId?: UuidWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter;
}
