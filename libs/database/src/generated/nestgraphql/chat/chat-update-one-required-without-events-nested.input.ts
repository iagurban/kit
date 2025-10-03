import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateOrConnectWithoutEventsInput } from './chat-create-or-connect-without-events.input';
import { ChatCreateWithoutEventsInput } from './chat-create-without-events.input';
import { ChatUpdateToOneWithWhereWithoutEventsInput } from './chat-update-to-one-with-where-without-events.input';
import { ChatUpsertWithoutEventsInput } from './chat-upsert-without-events.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUpdateOneRequiredWithoutEventsNestedInput {
  @Field(() => ChatCreateWithoutEventsInput, { nullable: true })
  @Type(() => ChatCreateWithoutEventsInput)
  create?: ChatCreateWithoutEventsInput;

  @Field(() => ChatCreateOrConnectWithoutEventsInput, { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutEventsInput)
  connectOrCreate?: ChatCreateOrConnectWithoutEventsInput;

  @Field(() => ChatUpsertWithoutEventsInput, { nullable: true })
  @Type(() => ChatUpsertWithoutEventsInput)
  upsert?: ChatUpsertWithoutEventsInput;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatUpdateToOneWithWhereWithoutEventsInput, { nullable: true })
  @Type(() => ChatUpdateToOneWithWhereWithoutEventsInput)
  update?: ChatUpdateToOneWithWhereWithoutEventsInput;
}
