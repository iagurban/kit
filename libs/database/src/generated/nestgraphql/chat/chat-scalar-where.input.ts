import { Field, InputType } from '@nestjs/graphql';

import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UuidNullableFilter } from '../prisma/uuid-nullable-filter.input';

@InputType()
export class ChatScalarWhereInput {
  @Field(() => [ChatScalarWhereInput], { nullable: true })
  AND?: Array<ChatScalarWhereInput>;

  @Field(() => [ChatScalarWhereInput], { nullable: true })
  OR?: Array<ChatScalarWhereInput>;

  @Field(() => [ChatScalarWhereInput], { nullable: true })
  NOT?: Array<ChatScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  bio?: StringNullableFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  avatar?: StringNullableFilter;

  @Field(() => UuidFilter, { nullable: true })
  ownerId?: UuidFilter;

  @Field(() => UuidNullableFilter, { nullable: true })
  defaultRoleId?: UuidNullableFilter;
}
