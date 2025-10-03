import { Field, InputType } from '@nestjs/graphql';

import { BigIntFilter } from '../prisma/big-int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class ChatEventScalarWhereInput {
  @Field(() => [ChatEventScalarWhereInput], { nullable: true })
  AND?: Array<ChatEventScalarWhereInput>;

  @Field(() => [ChatEventScalarWhereInput], { nullable: true })
  OR?: Array<ChatEventScalarWhereInput>;

  @Field(() => [ChatEventScalarWhereInput], { nullable: true })
  NOT?: Array<ChatEventScalarWhereInput>;

  @Field(() => BigIntFilter, { nullable: true })
  id?: BigIntFilter;

  @Field(() => BigIntFilter, { nullable: true })
  nn?: BigIntFilter;

  @Field(() => UuidFilter, { nullable: true })
  chatId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  authorId?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  type?: StringFilter;

  @Field(() => JsonFilter, { nullable: true })
  payload?: JsonFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
