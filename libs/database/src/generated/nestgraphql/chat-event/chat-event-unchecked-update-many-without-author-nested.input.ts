import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventCreateManyAuthorInputEnvelope } from './chat-event-create-many-author-input-envelope.input';
import { ChatEventCreateOrConnectWithoutAuthorInput } from './chat-event-create-or-connect-without-author.input';
import { ChatEventCreateWithoutAuthorInput } from './chat-event-create-without-author.input';
import { ChatEventScalarWhereInput } from './chat-event-scalar-where.input';
import { ChatEventUpdateManyWithWhereWithoutAuthorInput } from './chat-event-update-many-with-where-without-author.input';
import { ChatEventUpdateWithWhereUniqueWithoutAuthorInput } from './chat-event-update-with-where-unique-without-author.input';
import { ChatEventUpsertWithWhereUniqueWithoutAuthorInput } from './chat-event-upsert-with-where-unique-without-author.input';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@InputType()
export class ChatEventUncheckedUpdateManyWithoutAuthorNestedInput {
  @Field(() => [ChatEventCreateWithoutAuthorInput], { nullable: true })
  @Type(() => ChatEventCreateWithoutAuthorInput)
  create?: Array<ChatEventCreateWithoutAuthorInput>;

  @Field(() => [ChatEventCreateOrConnectWithoutAuthorInput], { nullable: true })
  @Type(() => ChatEventCreateOrConnectWithoutAuthorInput)
  connectOrCreate?: Array<ChatEventCreateOrConnectWithoutAuthorInput>;

  @Field(() => [ChatEventUpsertWithWhereUniqueWithoutAuthorInput], { nullable: true })
  @Type(() => ChatEventUpsertWithWhereUniqueWithoutAuthorInput)
  upsert?: Array<ChatEventUpsertWithWhereUniqueWithoutAuthorInput>;

  @Field(() => ChatEventCreateManyAuthorInputEnvelope, { nullable: true })
  @Type(() => ChatEventCreateManyAuthorInputEnvelope)
  createMany?: ChatEventCreateManyAuthorInputEnvelope;

  @Field(() => [ChatEventWhereUniqueInput], { nullable: true })
  @Type(() => ChatEventWhereUniqueInput)
  set?: Array<Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>>;

  @Field(() => [ChatEventWhereUniqueInput], { nullable: true })
  @Type(() => ChatEventWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>>;

  @Field(() => [ChatEventWhereUniqueInput], { nullable: true })
  @Type(() => ChatEventWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>>;

  @Field(() => [ChatEventWhereUniqueInput], { nullable: true })
  @Type(() => ChatEventWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>>;

  @Field(() => [ChatEventUpdateWithWhereUniqueWithoutAuthorInput], { nullable: true })
  @Type(() => ChatEventUpdateWithWhereUniqueWithoutAuthorInput)
  update?: Array<ChatEventUpdateWithWhereUniqueWithoutAuthorInput>;

  @Field(() => [ChatEventUpdateManyWithWhereWithoutAuthorInput], { nullable: true })
  @Type(() => ChatEventUpdateManyWithWhereWithoutAuthorInput)
  updateMany?: Array<ChatEventUpdateManyWithWhereWithoutAuthorInput>;

  @Field(() => [ChatEventScalarWhereInput], { nullable: true })
  @Type(() => ChatEventScalarWhereInput)
  deleteMany?: Array<ChatEventScalarWhereInput>;
}
