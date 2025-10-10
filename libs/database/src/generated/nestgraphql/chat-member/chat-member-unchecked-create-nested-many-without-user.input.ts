import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatMemberCreateManyUserInputEnvelope } from './chat-member-create-many-user-input-envelope.input';
import { ChatMemberCreateOrConnectWithoutUserInput } from './chat-member-create-or-connect-without-user.input';
import { ChatMemberCreateWithoutUserInput } from './chat-member-create-without-user.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@InputType()
export class ChatMemberUncheckedCreateNestedManyWithoutUserInput {
  @Field(() => [ChatMemberCreateWithoutUserInput], { nullable: true })
  @Type(() => ChatMemberCreateWithoutUserInput)
  create?: Array<ChatMemberCreateWithoutUserInput>;

  @Field(() => [ChatMemberCreateOrConnectWithoutUserInput], { nullable: true })
  @Type(() => ChatMemberCreateOrConnectWithoutUserInput)
  connectOrCreate?: Array<ChatMemberCreateOrConnectWithoutUserInput>;

  @Field(() => ChatMemberCreateManyUserInputEnvelope, { nullable: true })
  @Type(() => ChatMemberCreateManyUserInputEnvelope)
  createMany?: ChatMemberCreateManyUserInputEnvelope;

  @Field(() => [ChatMemberWhereUniqueInput], { nullable: true })
  @Type(() => ChatMemberWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>>;
}
