import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatRoleCountAggregateInput } from './chat-role-count-aggregate.input';
import { ChatRoleMaxAggregateInput } from './chat-role-max-aggregate.input';
import { ChatRoleMinAggregateInput } from './chat-role-min-aggregate.input';
import { ChatRoleOrderByWithAggregationInput } from './chat-role-order-by-with-aggregation.input';
import { ChatRoleScalarFieldEnum } from './chat-role-scalar-field.enum';
import { ChatRoleScalarWhereWithAggregatesInput } from './chat-role-scalar-where-with-aggregates.input';
import { ChatRoleWhereInput } from './chat-role-where.input';

@ArgsType()
export class ChatRoleGroupByArgs {
  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  where?: ChatRoleWhereInput;

  @Field(() => [ChatRoleOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ChatRoleOrderByWithAggregationInput>;

  @Field(() => [ChatRoleScalarFieldEnum], { nullable: false })
  by!: Array<`${ChatRoleScalarFieldEnum}`>;

  @Field(() => ChatRoleScalarWhereWithAggregatesInput, { nullable: true })
  having?: ChatRoleScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ChatRoleCountAggregateInput, { nullable: true })
  _count?: ChatRoleCountAggregateInput;

  @Field(() => ChatRoleMinAggregateInput, { nullable: true })
  _min?: ChatRoleMinAggregateInput;

  @Field(() => ChatRoleMaxAggregateInput, { nullable: true })
  _max?: ChatRoleMaxAggregateInput;
}
