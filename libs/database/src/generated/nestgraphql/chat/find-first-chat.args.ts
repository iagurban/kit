import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatOrderByWithRelationInput } from './chat-order-by-with-relation.input';
import { ChatScalarFieldEnum } from './chat-scalar-field.enum';
import { ChatWhereInput } from './chat-where.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@ArgsType()
export class FindFirstChatArgs {
  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;

  @Field(() => [ChatOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ChatOrderByWithRelationInput>;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ChatScalarFieldEnum], { nullable: true })
  distinct?: Array<`${ChatScalarFieldEnum}`>;
}
