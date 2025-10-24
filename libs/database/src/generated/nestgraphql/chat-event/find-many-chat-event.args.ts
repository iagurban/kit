import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventOrderByWithRelationInput } from './chat-event-order-by-with-relation.input';
import { ChatEventScalarFieldEnum } from './chat-event-scalar-field.enum';
import { ChatEventWhereInput } from './chat-event-where.input';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@ArgsType()
export class FindManyChatEventArgs {
  @Field(() => ChatEventWhereInput, { nullable: true })
  @Type(() => ChatEventWhereInput)
  where?: ChatEventWhereInput;

  @Field(() => [ChatEventOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ChatEventOrderByWithRelationInput>;

  @Field(() => ChatEventWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ChatEventScalarFieldEnum], { nullable: true })
  distinct?: Array<`${ChatEventScalarFieldEnum}`>;
}
