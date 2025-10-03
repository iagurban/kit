import { Field, InputType } from '@nestjs/graphql';

import { DateTimeNullableWithAggregatesFilter } from '../prisma/date-time-nullable-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class UploadChunkScalarWhereWithAggregatesInput {
  @Field(() => [UploadChunkScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<UploadChunkScalarWhereWithAggregatesInput>;

  @Field(() => [UploadChunkScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<UploadChunkScalarWhereWithAggregatesInput>;

  @Field(() => [UploadChunkScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<UploadChunkScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  sessionId?: UuidWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  partNumber?: IntWithAggregatesFilter;

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  eTag?: StringNullableWithAggregatesFilter;

  @Field(() => DateTimeNullableWithAggregatesFilter, { nullable: true })
  leasedAt?: DateTimeNullableWithAggregatesFilter;
}
