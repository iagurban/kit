import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserChatPermissionsCreateManyChatInputEnvelope } from './user-chat-permissions-create-many-chat-input-envelope.input';
import { UserChatPermissionsCreateOrConnectWithoutChatInput } from './user-chat-permissions-create-or-connect-without-chat.input';
import { UserChatPermissionsCreateWithoutChatInput } from './user-chat-permissions-create-without-chat.input';
import { UserChatPermissionsScalarWhereInput } from './user-chat-permissions-scalar-where.input';
import { UserChatPermissionsUpdateManyWithWhereWithoutChatInput } from './user-chat-permissions-update-many-with-where-without-chat.input';
import { UserChatPermissionsUpdateWithWhereUniqueWithoutChatInput } from './user-chat-permissions-update-with-where-unique-without-chat.input';
import { UserChatPermissionsUpsertWithWhereUniqueWithoutChatInput } from './user-chat-permissions-upsert-with-where-unique-without-chat.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsUncheckedUpdateManyWithoutChatNestedInput {
  @Field(() => [UserChatPermissionsCreateWithoutChatInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateWithoutChatInput)
  create?: Array<UserChatPermissionsCreateWithoutChatInput>;

  @Field(() => [UserChatPermissionsCreateOrConnectWithoutChatInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateOrConnectWithoutChatInput)
  connectOrCreate?: Array<UserChatPermissionsCreateOrConnectWithoutChatInput>;

  @Field(() => [UserChatPermissionsUpsertWithWhereUniqueWithoutChatInput], { nullable: true })
  @Type(() => UserChatPermissionsUpsertWithWhereUniqueWithoutChatInput)
  upsert?: Array<UserChatPermissionsUpsertWithWhereUniqueWithoutChatInput>;

  @Field(() => UserChatPermissionsCreateManyChatInputEnvelope, { nullable: true })
  @Type(() => UserChatPermissionsCreateManyChatInputEnvelope)
  createMany?: UserChatPermissionsCreateManyChatInputEnvelope;

  @Field(() => [UserChatPermissionsWhereUniqueInput], { nullable: true })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  set?: Array<Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>>;

  @Field(() => [UserChatPermissionsWhereUniqueInput], { nullable: true })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>>;

  @Field(() => [UserChatPermissionsWhereUniqueInput], { nullable: true })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>>;

  @Field(() => [UserChatPermissionsWhereUniqueInput], { nullable: true })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>>;

  @Field(() => [UserChatPermissionsUpdateWithWhereUniqueWithoutChatInput], { nullable: true })
  @Type(() => UserChatPermissionsUpdateWithWhereUniqueWithoutChatInput)
  update?: Array<UserChatPermissionsUpdateWithWhereUniqueWithoutChatInput>;

  @Field(() => [UserChatPermissionsUpdateManyWithWhereWithoutChatInput], { nullable: true })
  @Type(() => UserChatPermissionsUpdateManyWithWhereWithoutChatInput)
  updateMany?: Array<UserChatPermissionsUpdateManyWithWhereWithoutChatInput>;

  @Field(() => [UserChatPermissionsScalarWhereInput], { nullable: true })
  @Type(() => UserChatPermissionsScalarWhereInput)
  deleteMany?: Array<UserChatPermissionsScalarWhereInput>;
}
