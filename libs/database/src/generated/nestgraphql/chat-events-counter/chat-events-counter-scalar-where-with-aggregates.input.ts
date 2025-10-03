import { Field, InputType } from '@nestjs/graphql';

import { BigIntWithAggregatesFilter } from '../prisma/big-int-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class ChatEventsCounterScalarWhereWithAggregatesInput {
  @Field(() => [ChatEventsCounterScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ChatEventsCounterScalarWhereWithAggregatesInput>;

  @Field(() => [ChatEventsCounterScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ChatEventsCounterScalarWhereWithAggregatesInput>;

  @Field(() => [ChatEventsCounterScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ChatEventsCounterScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  chatId?: UuidWithAggregatesFilter;

  @Field(() => BigIntWithAggregatesFilter, { nullable: true })
  lastNn?: BigIntWithAggregatesFilter;
}
