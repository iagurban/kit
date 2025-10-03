import { Field, InputType } from '@nestjs/graphql';

import { BigIntFilter } from '../prisma/big-int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { JsonNullableFilter } from '../prisma/json-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UploadSessionNullableScalarRelationFilter } from '../upload-session/upload-session-nullable-scalar-relation-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';
import { StoredFileChecksumSizeBytesCompoundUniqueInput } from './stored-file-checksum-size-bytes-compound-unique.input';
import { StoredFileWhereInput } from './stored-file-where.input';

@InputType()
export class StoredFileWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  storageKey?: string;

  @Field(() => StoredFileChecksumSizeBytesCompoundUniqueInput, { nullable: true })
  checksum_sizeBytes?: StoredFileChecksumSizeBytesCompoundUniqueInput;

  @Field(() => [StoredFileWhereInput], { nullable: true })
  AND?: Array<StoredFileWhereInput>;

  @Field(() => [StoredFileWhereInput], { nullable: true })
  OR?: Array<StoredFileWhereInput>;

  @Field(() => [StoredFileWhereInput], { nullable: true })
  NOT?: Array<StoredFileWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  checksum?: StringFilter;

  @Field(() => BigIntFilter, { nullable: true })
  sizeBytes?: BigIntFilter;

  @Field(() => StringFilter, { nullable: true })
  originalFilename?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  mimeType?: StringFilter;

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

  @Field(() => UserScalarRelationFilter, { nullable: true })
  uploadedByUser?: UserScalarRelationFilter;

  @Field(() => UploadSessionNullableScalarRelationFilter, { nullable: true })
  uploadSession?: UploadSessionNullableScalarRelationFilter;
}
