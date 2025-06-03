import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemListRelationFilter } from '../item/item-list-relation-filter.input';
import { MenuScalarRelationFilter } from '../menu/menu-scalar-relation-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { StoredFileScalarRelationFilter } from '../stored-file/stored-file-scalar-relation-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';

@InputType()
export class UploadedFileWhereInput {
  @Field(() => [UploadedFileWhereInput], { nullable: true })
  AND?: Array<UploadedFileWhereInput>;

  @Field(() => [UploadedFileWhereInput], { nullable: true })
  OR?: Array<UploadedFileWhereInput>;

  @Field(() => [UploadedFileWhereInput], { nullable: true })
  NOT?: Array<UploadedFileWhereInput>;

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

  @Field(() => UserScalarRelationFilter, { nullable: true })
  uploader?: UserScalarRelationFilter;

  @Field(() => StoredFileScalarRelationFilter, { nullable: true })
  storedFile?: StoredFileScalarRelationFilter;

  @Field(() => MenuScalarRelationFilter, { nullable: true })
  @Type(() => MenuScalarRelationFilter)
  menu?: MenuScalarRelationFilter;

  @Field(() => ItemListRelationFilter, { nullable: true })
  @Type(() => ItemListRelationFilter)
  usingItems?: ItemListRelationFilter;
}
