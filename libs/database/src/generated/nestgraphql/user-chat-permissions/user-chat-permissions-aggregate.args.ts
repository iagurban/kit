import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserChatPermissionsCountAggregateInput } from './user-chat-permissions-count-aggregate.input';
import { UserChatPermissionsMaxAggregateInput } from './user-chat-permissions-max-aggregate.input';
import { UserChatPermissionsMinAggregateInput } from './user-chat-permissions-min-aggregate.input';
import { UserChatPermissionsOrderByWithRelationInput } from './user-chat-permissions-order-by-with-relation.input';
import { UserChatPermissionsWhereInput } from './user-chat-permissions-where.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@ArgsType()
export class UserChatPermissionsAggregateArgs {
  @Field(() => UserChatPermissionsWhereInput, { nullable: true })
  @Type(() => UserChatPermissionsWhereInput)
  where?: UserChatPermissionsWhereInput;

  @Field(() => [UserChatPermissionsOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UserChatPermissionsOrderByWithRelationInput>;

  @Field(() => UserChatPermissionsWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>;

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
