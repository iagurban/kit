import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UploadedFileListRelationFilter } from '../uploaded-file/uploaded-file-list-relation-filter.input';
import { StoredFileWhereInput } from './stored-file-where.input';

@InputType()
export class StoredFileWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [StoredFileWhereInput], { nullable: true })
  AND?: Array<StoredFileWhereInput>;

  @Field(() => [StoredFileWhereInput], { nullable: true })
  OR?: Array<StoredFileWhereInput>;

  @Field(() => [StoredFileWhereInput], { nullable: true })
  NOT?: Array<StoredFileWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  hash?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  size?: IntFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => UploadedFileListRelationFilter, { nullable: true })
  uploads?: UploadedFileListRelationFilter;
}
