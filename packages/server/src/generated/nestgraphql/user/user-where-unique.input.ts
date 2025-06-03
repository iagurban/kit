import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuListRelationFilter } from '../menu/menu-list-relation-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { RefreshTokenListRelationFilter } from '../refresh-token/refresh-token-list-relation-filter.input';
import { UploadedFileListRelationFilter } from '../uploaded-file/uploaded-file-list-relation-filter.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [UserWhereInput], { nullable: true })
  AND?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  OR?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  NOT?: Array<UserWhereInput>;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => StringFilter, { nullable: true })
  passwordHash?: StringFilter;

  @Field(() => MenuListRelationFilter, { nullable: true })
  @Type(() => MenuListRelationFilter)
  menus?: MenuListRelationFilter;

  @Field(() => UploadedFileListRelationFilter, { nullable: true })
  @Type(() => UploadedFileListRelationFilter)
  uploadedFiles?: UploadedFileListRelationFilter;

  @Field(() => RefreshTokenListRelationFilter, { nullable: true })
  refreshTokens?: RefreshTokenListRelationFilter;
}
