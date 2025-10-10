import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatMemberCountAggregateInput } from './chat-member-count-aggregate.input';
import { ChatMemberMaxAggregateInput } from './chat-member-max-aggregate.input';
import { ChatMemberMinAggregateInput } from './chat-member-min-aggregate.input';
import { ChatMemberOrderByWithAggregationInput } from './chat-member-order-by-with-aggregation.input';
import { ChatMemberScalarFieldEnum } from './chat-member-scalar-field.enum';
import { ChatMemberScalarWhereWithAggregatesInput } from './chat-member-scalar-where-with-aggregates.input';
import { ChatMemberWhereInput } from './chat-member-where.input';

@ArgsType()
export class ChatMemberGroupByArgs {
  @Field(() => ChatMemberWhereInput, { nullable: true })
  @Type(() => ChatMemberWhereInput)
  where?: ChatMemberWhereInput;

  @Field(() => [ChatMemberOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ChatMemberOrderByWithAggregationInput>;

  @Field(() => [ChatMemberScalarFieldEnum], { nullable: false })
  by!: Array<`${ChatMemberScalarFieldEnum}`>;

  @Field(() => ChatMemberScalarWhereWithAggregatesInput, { nullable: true })
  having?: ChatMemberScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ChatMemberCountAggregateInput, { nullable: true })
  _count?: ChatMemberCountAggregateInput;

  @Field(() => ChatMemberMinAggregateInput, { nullable: true })
  _min?: ChatMemberMinAggregateInput;

  @Field(() => ChatMemberMaxAggregateInput, { nullable: true })
  _max?: ChatMemberMaxAggregateInput;
}
