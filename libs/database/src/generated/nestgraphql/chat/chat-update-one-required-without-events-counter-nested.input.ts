import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateOrConnectWithoutEventsCounterInput } from './chat-create-or-connect-without-events-counter.input';
import { ChatCreateWithoutEventsCounterInput } from './chat-create-without-events-counter.input';
import { ChatUpdateToOneWithWhereWithoutEventsCounterInput } from './chat-update-to-one-with-where-without-events-counter.input';
import { ChatUpsertWithoutEventsCounterInput } from './chat-upsert-without-events-counter.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUpdateOneRequiredWithoutEventsCounterNestedInput {
  @Field(() => ChatCreateWithoutEventsCounterInput, { nullable: true })
  @Type(() => ChatCreateWithoutEventsCounterInput)
  create?: ChatCreateWithoutEventsCounterInput;

  @Field(() => ChatCreateOrConnectWithoutEventsCounterInput, { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutEventsCounterInput)
  connectOrCreate?: ChatCreateOrConnectWithoutEventsCounterInput;

  @Field(() => ChatUpsertWithoutEventsCounterInput, { nullable: true })
  @Type(() => ChatUpsertWithoutEventsCounterInput)
  upsert?: ChatUpsertWithoutEventsCounterInput;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatUpdateToOneWithWhereWithoutEventsCounterInput, { nullable: true })
  @Type(() => ChatUpdateToOneWithWhereWithoutEventsCounterInput)
  update?: ChatUpdateToOneWithWhereWithoutEventsCounterInput;
}
