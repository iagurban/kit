import { Field, InputType } from '@nestjs/graphql';

import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class ChatMemberScalarWhereWithAggregatesInput {
  @Field(() => [ChatMemberScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ChatMemberScalarWhereWithAggregatesInput>;

  @Field(() => [ChatMemberScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ChatMemberScalarWhereWithAggregatesInput>;

  @Field(() => [ChatMemberScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ChatMemberScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  userId?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  chatId?: UuidWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  joinedAt?: DateTimeWithAggregatesFilter;
}
