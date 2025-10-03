import { Field, InputType } from '@nestjs/graphql';

import { BigIntFilter } from '../prisma/big-int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { JsonNullableFilter } from '../prisma/json-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class StoredFileScalarWhereInput {
  @Field(() => [StoredFileScalarWhereInput], { nullable: true })
  AND?: Array<StoredFileScalarWhereInput>;

  @Field(() => [StoredFileScalarWhereInput], { nullable: true })
  OR?: Array<StoredFileScalarWhereInput>;

  @Field(() => [StoredFileScalarWhereInput], { nullable: true })
  NOT?: Array<StoredFileScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  checksum?: StringFilter;

  @Field(() => BigIntFilter, { nullable: true })
  sizeBytes?: BigIntFilter;

  @Field(() => StringFilter, { nullable: true })
  originalFilename?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  mimeType?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  storageKey?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  cdnUrl?: StringFilter;

  @Field(() => JsonNullableFilter, { nullable: true })
  metadata?: JsonNullableFilter;

  @Field(() => UuidFilter, { nullable: true })
  uploadedByUserId?: UuidFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter;
}
