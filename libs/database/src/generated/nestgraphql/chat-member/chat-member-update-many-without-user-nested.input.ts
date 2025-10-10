import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatMemberCreateManyUserInputEnvelope } from './chat-member-create-many-user-input-envelope.input';
import { ChatMemberCreateOrConnectWithoutUserInput } from './chat-member-create-or-connect-without-user.input';
import { ChatMemberCreateWithoutUserInput } from './chat-member-create-without-user.input';
import { ChatMemberScalarWhereInput } from './chat-member-scalar-where.input';
import { ChatMemberUpdateManyWithWhereWithoutUserInput } from './chat-member-update-many-with-where-without-user.input';
import { ChatMemberUpdateWithWhereUniqueWithoutUserInput } from './chat-member-update-with-where-unique-without-user.input';
import { ChatMemberUpsertWithWhereUniqueWithoutUserInput } from './chat-member-upsert-with-where-unique-without-user.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@InputType()
export class ChatMemberUpdateManyWithoutUserNestedInput {
  @Field(() => [ChatMemberCreateWithoutUserInput], { nullable: true })
  @Type(() => ChatMemberCreateWithoutUserInput)
  create?: Array<ChatMemberCreateWithoutUserInput>;

  @Field(() => [ChatMemberCreateOrConnectWithoutUserInput], { nullable: true })
  @Type(() => ChatMemberCreateOrConnectWithoutUserInput)
  connectOrCreate?: Array<ChatMemberCreateOrConnectWithoutUserInput>;

  @Field(() => [ChatMemberUpsertWithWhereUniqueWithoutUserInput], { nullable: true })
  @Type(() => ChatMemberUpsertWithWhereUniqueWithoutUserInput)
  upsert?: Array<ChatMemberUpsertWithWhereUniqueWithoutUserInput>;

  @Field(() => ChatMemberCreateManyUserInputEnvelope, { nullable: true })
  @Type(() => ChatMemberCreateManyUserInputEnvelope)
  createMany?: ChatMemberCreateManyUserInputEnvelope;

  @Field(() => [ChatMemberWhereUniqueInput], { nullable: true })
  @Type(() => ChatMemberWhereUniqueInput)
  set?: Array<Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>>;

  @Field(() => [ChatMemberWhereUniqueInput], { nullable: true })
  @Type(() => ChatMemberWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>>;

  @Field(() => [ChatMemberWhereUniqueInput], { nullable: true })
  @Type(() => ChatMemberWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>>;

  @Field(() => [ChatMemberWhereUniqueInput], { nullable: true })
  @Type(() => ChatMemberWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>>;

  @Field(() => [ChatMemberUpdateWithWhereUniqueWithoutUserInput], { nullable: true })
  @Type(() => ChatMemberUpdateWithWhereUniqueWithoutUserInput)
  update?: Array<ChatMemberUpdateWithWhereUniqueWithoutUserInput>;

  @Field(() => [ChatMemberUpdateManyWithWhereWithoutUserInput], { nullable: true })
  @Type(() => ChatMemberUpdateManyWithWhereWithoutUserInput)
  updateMany?: Array<ChatMemberUpdateManyWithWhereWithoutUserInput>;

  @Field(() => [ChatMemberScalarWhereInput], { nullable: true })
  @Type(() => ChatMemberScalarWhereInput)
  deleteMany?: Array<ChatMemberScalarWhereInput>;
}
