import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MessagesCounterOrderByWithRelationInput } from './messages-counter-order-by-with-relation.input';
import { MessagesCounterScalarFieldEnum } from './messages-counter-scalar-field.enum';
import { MessagesCounterWhereInput } from './messages-counter-where.input';
import { MessagesCounterWhereUniqueInput } from './messages-counter-where-unique.input';

@ArgsType()
export class FindFirstMessagesCounterArgs {
  @Field(() => MessagesCounterWhereInput, { nullable: true })
  @Type(() => MessagesCounterWhereInput)
  where?: MessagesCounterWhereInput;

  @Field(() => [MessagesCounterOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<MessagesCounterOrderByWithRelationInput>;

  @Field(() => MessagesCounterWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<MessagesCounterWhereUniqueInput, 'chatId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [MessagesCounterScalarFieldEnum], { nullable: true })
  distinct?: Array<`${MessagesCounterScalarFieldEnum}`>;
}
