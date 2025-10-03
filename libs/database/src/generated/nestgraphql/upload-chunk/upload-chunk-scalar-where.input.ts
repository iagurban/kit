import { Field, InputType } from '@nestjs/graphql';

import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class UploadChunkScalarWhereInput {
  @Field(() => [UploadChunkScalarWhereInput], { nullable: true })
  AND?: Array<UploadChunkScalarWhereInput>;

  @Field(() => [UploadChunkScalarWhereInput], { nullable: true })
  OR?: Array<UploadChunkScalarWhereInput>;

  @Field(() => [UploadChunkScalarWhereInput], { nullable: true })
  NOT?: Array<UploadChunkScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  sessionId?: UuidFilter;

  @Field(() => IntFilter, { nullable: true })
  partNumber?: IntFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  eTag?: StringNullableFilter;

  @Field(() => DateTimeNullableFilter, { nullable: true })
  leasedAt?: DateTimeNullableFilter;
}
