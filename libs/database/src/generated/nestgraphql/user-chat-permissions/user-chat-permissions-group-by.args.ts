import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserChatPermissionsCountAggregateInput } from './user-chat-permissions-count-aggregate.input';
import { UserChatPermissionsMaxAggregateInput } from './user-chat-permissions-max-aggregate.input';
import { UserChatPermissionsMinAggregateInput } from './user-chat-permissions-min-aggregate.input';
import { UserChatPermissionsOrderByWithAggregationInput } from './user-chat-permissions-order-by-with-aggregation.input';
import { UserChatPermissionsScalarFieldEnum } from './user-chat-permissions-scalar-field.enum';
import { UserChatPermissionsScalarWhereWithAggregatesInput } from './user-chat-permissions-scalar-where-with-aggregates.input';
import { UserChatPermissionsWhereInput } from './user-chat-permissions-where.input';

@ArgsType()
export class UserChatPermissionsGroupByArgs {
  @Field(() => UserChatPermissionsWhereInput, { nullable: true })
  @Type(() => UserChatPermissionsWhereInput)
  where?: UserChatPermissionsWhereInput;

  @Field(() => [UserChatPermissionsOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<UserChatPermissionsOrderByWithAggregationInput>;

  @Field(() => [UserChatPermissionsScalarFieldEnum], { nullable: false })
  by!: Array<`${UserChatPermissionsScalarFieldEnum}`>;

  @Field(() => UserChatPermissionsScalarWhereWithAggregatesInput, { nullable: true })
  having?: UserChatPermissionsScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => UserChatPermissionsCountAggregateInput, { nullable: true })
  _count?: UserChatPermissionsCountAggregateInput;

  @Field(() => UserChatPermissionsMinAggregateInput, { nullable: true })
  _min?: UserChatPermissionsMinAggregateInput;

  @Field(() => UserChatPermissionsMaxAggregateInput, { nullable: true })
  _max?: UserChatPermissionsMaxAggregateInput;
}
