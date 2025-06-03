import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class UploadedFileScalarWhereInput {
  @Field(() => [UploadedFileScalarWhereInput], { nullable: true })
  AND?: Array<UploadedFileScalarWhereInput>;

  @Field(() => [UploadedFileScalarWhereInput], { nullable: true })
  OR?: Array<UploadedFileScalarWhereInput>;

  @Field(() => [UploadedFileScalarWhereInput], { nullable: true })
  NOT?: Array<UploadedFileScalarWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  originalName?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  mimetype?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  uploadedAt?: DateTimeFilter;

  @Field(() => UuidFilter, { nullable: true })
  uploaderId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  storedFileId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  menuId?: UuidFilter;
}
