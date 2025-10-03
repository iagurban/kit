import { Field, InputType } from '@nestjs/graphql';

import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { EnumUploadStatusWithAggregatesFilter } from '../prisma/enum-upload-status-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class UploadSessionScalarWhereWithAggregatesInput {
  @Field(() => [UploadSessionScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<UploadSessionScalarWhereWithAggregatesInput>;

  @Field(() => [UploadSessionScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<UploadSessionScalarWhereWithAggregatesInput>;

  @Field(() => [UploadSessionScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<UploadSessionScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  storageUploadId?: StringWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  fileId?: UuidWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  totalChunks?: IntWithAggregatesFilter;

  @Field(() => EnumUploadStatusWithAggregatesFilter, { nullable: true })
  status?: EnumUploadStatusWithAggregatesFilter;

  @Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  failReason?: StringNullableWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  totalFailureCount?: IntWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter;
}
