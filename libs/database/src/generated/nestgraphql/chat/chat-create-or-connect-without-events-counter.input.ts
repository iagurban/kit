import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateWithoutEventsCounterInput } from './chat-create-without-events-counter.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateOrConnectWithoutEventsCounterInput {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatCreateWithoutEventsCounterInput, { nullable: false })
  @Type(() => ChatCreateWithoutEventsCounterInput)
  create!: ChatCreateWithoutEventsCounterInput;
}
