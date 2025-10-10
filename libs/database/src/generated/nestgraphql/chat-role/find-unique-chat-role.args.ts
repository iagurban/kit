import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@ArgsType()
export class FindUniqueChatRoleArgs {
  @Field(() => ChatRoleWhereUniqueInput, { nullable: false })
  @Type(() => ChatRoleWhereUniqueInput)
  where!: Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>;
}
