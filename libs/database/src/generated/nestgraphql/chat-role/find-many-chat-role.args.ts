import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatRoleOrderByWithRelationInput } from './chat-role-order-by-with-relation.input';
import { ChatRoleScalarFieldEnum } from './chat-role-scalar-field.enum';
import { ChatRoleWhereInput } from './chat-role-where.input';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@ArgsType()
export class FindManyChatRoleArgs {
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

  @Field(() => [ChatRoleScalarFieldEnum], { nullable: true })
  distinct?: Array<`${ChatRoleScalarFieldEnum}`>;
}
