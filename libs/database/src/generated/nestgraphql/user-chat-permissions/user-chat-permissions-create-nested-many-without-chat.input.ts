import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserChatPermissionsCreateManyChatInputEnvelope } from './user-chat-permissions-create-many-chat-input-envelope.input';
import { UserChatPermissionsCreateOrConnectWithoutChatInput } from './user-chat-permissions-create-or-connect-without-chat.input';
import { UserChatPermissionsCreateWithoutChatInput } from './user-chat-permissions-create-without-chat.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsCreateNestedManyWithoutChatInput {
  @Field(() => [UserChatPermissionsCreateWithoutChatInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateWithoutChatInput)
  create?: Array<UserChatPermissionsCreateWithoutChatInput>;

  @Field(() => [UserChatPermissionsCreateOrConnectWithoutChatInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateOrConnectWithoutChatInput)
  connectOrCreate?: Array<UserChatPermissionsCreateOrConnectWithoutChatInput>;

  @Field(() => UserChatPermissionsCreateManyChatInputEnvelope, { nullable: true })
  @Type(() => UserChatPermissionsCreateManyChatInputEnvelope)
  createMany?: UserChatPermissionsCreateManyChatInputEnvelope;

  @Field(() => [UserChatPermissionsWhereUniqueInput], { nullable: true })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>>;
}
