import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemListRelationFilter } from '../item/item-list-relation-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { TagListRelationFilter } from '../tag/tag-list-relation-filter.input';
import { UploadedFileListRelationFilter } from '../uploaded-file/uploaded-file-list-relation-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';
import { MenuWhereInput } from './menu-where.input';

@InputType()
export class MenuWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [MenuWhereInput], { nullable: true })
  AND?: Array<MenuWhereInput>;

  @Field(() => [MenuWhereInput], { nullable: true })
  OR?: Array<MenuWhereInput>;

  @Field(() => [MenuWhereInput], { nullable: true })
  NOT?: Array<MenuWhereInput>;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => UuidFilter, { nullable: true })
  ownerId?: UuidFilter;

  @Field(() => UserScalarRelationFilter, { nullable: true })
  owner?: UserScalarRelationFilter;

  @Field(() => ItemListRelationFilter, { nullable: true })
  @Type(() => ItemListRelationFilter)
  items?: ItemListRelationFilter;

  @Field(() => TagListRelationFilter, { nullable: true })
  tags?: TagListRelationFilter;

  @Field(() => UploadedFileListRelationFilter, { nullable: true })
  @Type(() => UploadedFileListRelationFilter)
  files?: UploadedFileListRelationFilter;
}
