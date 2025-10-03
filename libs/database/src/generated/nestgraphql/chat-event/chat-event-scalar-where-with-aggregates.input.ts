import { Field, InputType } from '@nestjs/graphql';

import { BigIntWithAggregatesFilter } from '../prisma/big-int-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { JsonWithAggregatesFilter } from '../prisma/json-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class ChatEventScalarWhereWithAggregatesInput {
  @Field(() => [ChatEventScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ChatEventScalarWhereWithAggregatesInput>;

  @Field(() => [ChatEventScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ChatEventScalarWhereWithAggregatesInput>;

  @Field(() => [ChatEventScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ChatEventScalarWhereWithAggregatesInput>;

  @Field(() => BigIntWithAggregatesFilter, { nullable: true })
  id?: BigIntWithAggregatesFilter;

  @Field(() => BigIntWithAggregatesFilter, { nullable: true })
  nn?: BigIntWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  chatId?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  authorId?: UuidWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  type?: StringWithAggregatesFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  payload?: JsonWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter;
}
