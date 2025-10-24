import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateWithoutMessagesCounterInput } from './chat-create-without-messages-counter.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateOrConnectWithoutMessagesCounterInput {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatCreateWithoutMessagesCounterInput, { nullable: false })
  @Type(() => ChatCreateWithoutMessagesCounterInput)
  create!: ChatCreateWithoutMessagesCounterInput;
}
