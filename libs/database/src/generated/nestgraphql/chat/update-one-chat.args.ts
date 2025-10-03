import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatUpdateInput } from './chat-update.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@ArgsType()
export class UpdateOneChatArgs {
  @Field(() => ChatUpdateInput, { nullable: false })
  @Type(() => ChatUpdateInput)
  data!: ChatUpdateInput;

  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;
}
