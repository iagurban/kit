import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { EnumUploadStatusFilter } from '../prisma/enum-upload-status-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { StoredFileScalarRelationFilter } from '../stored-file/stored-file-scalar-relation-filter.input';
import { UploadChunkListRelationFilter } from '../upload-chunk/upload-chunk-list-relation-filter.input';
import { UploadSessionWhereInput } from './upload-session-where.input';

@InputType()
export class UploadSessionWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  storageUploadId?: string;

  @Field(() => String, { nullable: true })
  fileId?: string;

  @Field(() => [UploadSessionWhereInput], { nullable: true })
  AND?: Array<UploadSessionWhereInput>;

  @Field(() => [UploadSessionWhereInput], { nullable: true })
  OR?: Array<UploadSessionWhereInput>;

  @Field(() => [UploadSessionWhereInput], { nullable: true })
  NOT?: Array<UploadSessionWhereInput>;

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
