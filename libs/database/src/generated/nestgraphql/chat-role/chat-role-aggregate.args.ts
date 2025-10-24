import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatRoleCountAggregateInput } from './chat-role-count-aggregate.input';
import { ChatRoleMaxAggregateInput } from './chat-role-max-aggregate.input';
import { ChatRoleMinAggregateInput } from './chat-role-min-aggregate.input';
import { ChatRoleOrderByWithRelationInput } from './chat-role-order-by-with-relation.input';
import { ChatRoleWhereInput } from './chat-role-where.input';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@ArgsType()
export class ChatRoleAggregateArgs {
  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  where?: ChatRoleWhereInput;

  @Field(() => [ChatRoleOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ChatRoleOrderByWithRelationInput>;

  @Field(() => ChatRoleWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>;

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
