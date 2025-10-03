import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatEventCreateWithoutAuthorInput } from './chat-event-create-without-author.input';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@InputType()
export class ChatEventCreateOrConnectWithoutAuthorInput {
  @Field(() => ChatEventWhereUniqueInput, { nullable: false })
  @Type(() => ChatEventWhereUniqueInput)
  where!: Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>;

  @Field(() => ChatEventCreateWithoutAuthorInput, { nullable: false })
  @Type(() => ChatEventCreateWithoutAuthorInput)
  create!: ChatEventCreateWithoutAuthorInput;
}
