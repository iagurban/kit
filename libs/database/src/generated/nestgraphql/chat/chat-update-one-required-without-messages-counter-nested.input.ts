import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateOrConnectWithoutMessagesCounterInput } from './chat-create-or-connect-without-messages-counter.input';
import { ChatCreateWithoutMessagesCounterInput } from './chat-create-without-messages-counter.input';
import { ChatUpdateToOneWithWhereWithoutMessagesCounterInput } from './chat-update-to-one-with-where-without-messages-counter.input';
import { ChatUpsertWithoutMessagesCounterInput } from './chat-upsert-without-messages-counter.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUpdateOneRequiredWithoutMessagesCounterNestedInput {
  @Field(() => ChatCreateWithoutMessagesCounterInput, { nullable: true })
  @Type(() => ChatCreateWithoutMessagesCounterInput)
  create?: ChatCreateWithoutMessagesCounterInput;

  @Field(() => ChatCreateOrConnectWithoutMessagesCounterInput, { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutMessagesCounterInput)
  connectOrCreate?: ChatCreateOrConnectWithoutMessagesCounterInput;

  @Field(() => ChatUpsertWithoutMessagesCounterInput, { nullable: true })
  @Type(() => ChatUpsertWithoutMessagesCounterInput)
  upsert?: ChatUpsertWithoutMessagesCounterInput;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatUpdateToOneWithWhereWithoutMessagesCounterInput, { nullable: true })
  @Type(() => ChatUpdateToOneWithWhereWithoutMessagesCounterInput)
  update?: ChatUpdateToOneWithWhereWithoutMessagesCounterInput;
}
