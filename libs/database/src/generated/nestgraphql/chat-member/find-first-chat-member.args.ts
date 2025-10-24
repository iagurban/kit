import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatMemberOrderByWithRelationInput } from './chat-member-order-by-with-relation.input';
import { ChatMemberScalarFieldEnum } from './chat-member-scalar-field.enum';
import { ChatMemberWhereInput } from './chat-member-where.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@ArgsType()
export class FindFirstChatMemberArgs {
  @Field(() => ChatMemberWhereInput, { nullable: true })
  @Type(() => ChatMemberWhereInput)
  where?: ChatMemberWhereInput;

  @Field(() => [ChatMemberOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ChatMemberOrderByWithRelationInput>;

  @Field(() => ChatMemberWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ChatMemberScalarFieldEnum], { nullable: true })
  distinct?: Array<`${ChatMemberScalarFieldEnum}`>;
}
