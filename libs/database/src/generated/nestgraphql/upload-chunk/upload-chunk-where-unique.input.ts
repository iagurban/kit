import { Field, InputType } from '@nestjs/graphql';

import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UploadSessionScalarRelationFilter } from '../upload-session/upload-session-scalar-relation-filter.input';
import { UploadChunkSessionIdPartNumberCompoundUniqueInput } from './upload-chunk-session-id-part-number-compound-unique.input';
import { UploadChunkWhereInput } from './upload-chunk-where.input';

@InputType()
export class UploadChunkWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => UploadChunkSessionIdPartNumberCompoundUniqueInput, { nullable: true })
  sessionId_partNumber?: UploadChunkSessionIdPartNumberCompoundUniqueInput;

  @Field(() => [UploadChunkWhereInput], { nullable: true })
  AND?: Array<UploadChunkWhereInput>;

  @Field(() => [UploadChunkWhereInput], { nullable: true })
  OR?: Array<UploadChunkWhereInput>;

  @Field(() => [UploadChunkWhereInput], { nullable: true })
  NOT?: Array<UploadChunkWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  sessionId?: UuidFilter;

  @Field(() => IntFilter, { nullable: true })
  partNumber?: IntFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  eTag?: StringNullableFilter;

  @Field(() => DateTimeNullableFilter, { nullable: true })
  leasedAt?: DateTimeNullableFilter;

  @Field(() => UploadSessionScalarRelationFilter, { nullable: true })
  session?: UploadSessionScalarRelationFilter;
}
