import { Field, InputType } from '@nestjs/graphql';

import { BigIntWithAggregatesFilter } from '../prisma/big-int-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class MessagesCounterScalarWhereWithAggregatesInput {
  @Field(() => [MessagesCounterScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<MessagesCounterScalarWhereWithAggregatesInput>;

  @Field(() => [MessagesCounterScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<MessagesCounterScalarWhereWithAggregatesInput>;

  @Field(() => [MessagesCounterScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<MessagesCounterScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  chatId?: UuidWithAggregatesFilter;

  @Field(() => BigIntWithAggregatesFilter, { nullable: true })
  lastNn?: BigIntWithAggregatesFilter;
}
