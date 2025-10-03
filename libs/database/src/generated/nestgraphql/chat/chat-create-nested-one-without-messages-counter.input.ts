import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateOrConnectWithoutMessagesCounterInput } from './chat-create-or-connect-without-messages-counter.input';
import { ChatCreateWithoutMessagesCounterInput } from './chat-create-without-messages-counter.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateNestedOneWithoutMessagesCounterInput {
  @Field(() => ChatCreateWithoutMessagesCounterInput, { nullable: true })
  @Type(() => ChatCreateWithoutMessagesCounterInput)
  create?: ChatCreateWithoutMessagesCounterInput;

  @Field(() => ChatCreateOrConnectWithoutMessagesCounterInput, { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutMessagesCounterInput)
  connectOrCreate?: ChatCreateOrConnectWithoutMessagesCounterInput;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;
}
