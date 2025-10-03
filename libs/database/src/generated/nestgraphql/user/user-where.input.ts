import { Field, InputType } from '@nestjs/graphql';

import { ChatEventListRelationFilter } from '../chat-event/chat-event-list-relation-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { RefreshTokenListRelationFilter } from '../refresh-token/refresh-token-list-relation-filter.input';
import { StoredFileListRelationFilter } from '../stored-file/stored-file-list-relation-filter.input';

@InputType()
export class UserWhereInput {
  @Field(() => [UserWhereInput], { nullable: true })
  AND?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  OR?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  NOT?: Array<UserWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => StringFilter, { nullable: true })
  email?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  abbrev?: StringNullableFilter;

  @Field(() => StringFilter, { nullable: true })
  passwordHash?: StringFilter;

  @Field(() => StoredFileListRelationFilter, { nullable: true })
  uploadedFiles?: StoredFileListRelationFilter;

  @Field(() => RefreshTokenListRelationFilter, { nullable: true })
  refreshTokens?: RefreshTokenListRelationFilter;

  @Field(() => ChatEventListRelationFilter, { nullable: true })
  chatEvents?: ChatEventListRelationFilter;
}
