import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateOrConnectWithoutEventsCounterInput } from './chat-create-or-connect-without-events-counter.input';
import { ChatCreateWithoutEventsCounterInput } from './chat-create-without-events-counter.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateNestedOneWithoutEventsCounterInput {
  @Field(() => ChatCreateWithoutEventsCounterInput, { nullable: true })
  @Type(() => ChatCreateWithoutEventsCounterInput)
  create?: ChatCreateWithoutEventsCounterInput;

  @Field(() => ChatCreateOrConnectWithoutEventsCounterInput, { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutEventsCounterInput)
  connectOrCreate?: ChatCreateOrConnectWithoutEventsCounterInput;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;
}
