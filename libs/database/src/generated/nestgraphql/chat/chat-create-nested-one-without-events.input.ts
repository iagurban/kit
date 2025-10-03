import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateOrConnectWithoutEventsInput } from './chat-create-or-connect-without-events.input';
import { ChatCreateWithoutEventsInput } from './chat-create-without-events.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateNestedOneWithoutEventsInput {
  @Field(() => ChatCreateWithoutEventsInput, { nullable: true })
  @Type(() => ChatCreateWithoutEventsInput)
  create?: ChatCreateWithoutEventsInput;

  @Field(() => ChatCreateOrConnectWithoutEventsInput, { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutEventsInput)
  connectOrCreate?: ChatCreateOrConnectWithoutEventsInput;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;
}
