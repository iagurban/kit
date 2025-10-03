import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { EnumUploadStatusFilter } from '../prisma/enum-upload-status-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { StoredFileScalarRelationFilter } from '../stored-file/stored-file-scalar-relation-filter.input';
import { UploadChunkListRelationFilter } from '../upload-chunk/upload-chunk-list-relation-filter.input';

@InputType()
export class UploadSessionWhereInput {
  @Field(() => [UploadSessionWhereInput], { nullable: true })
  AND?: Array<UploadSessionWhereInput>;

  @Field(() => [UploadSessionWhereInput], { nullable: true })
  OR?: Array<UploadSessionWhereInput>;

  @Field(() => [UploadSessionWhereInput], { nullable: true })
  NOT?: Array<UploadSessionWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  storageUploadId?: StringFilter;

  @Field(() => UuidFilter, { nullable: true })
  fileId?: UuidFilter;

  @Field(() => IntFilter, { nullable: true })
  totalChunks?: IntFilter;

  @Field(() => EnumUploadStatusFilter, { nullable: true })
  status?: EnumUploadStatusFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  failReason?: StringNullableFilter;

  @Field(() => IntFilter, { nullable: true })
  totalFailureCount?: IntFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => StoredFileScalarRelationFilter, { nullable: true })
  file?: StoredFileScalarRelationFilter;

  @Field(() => UploadChunkListRelationFilter, { nullable: true })
  chunks?: UploadChunkListRelationFilter;
}
