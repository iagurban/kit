import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserChatPermissionsCreateManyUserInputEnvelope } from './user-chat-permissions-create-many-user-input-envelope.input';
import { UserChatPermissionsCreateOrConnectWithoutUserInput } from './user-chat-permissions-create-or-connect-without-user.input';
import { UserChatPermissionsCreateWithoutUserInput } from './user-chat-permissions-create-without-user.input';
import { UserChatPermissionsScalarWhereInput } from './user-chat-permissions-scalar-where.input';
import { UserChatPermissionsUpdateManyWithWhereWithoutUserInput } from './user-chat-permissions-update-many-with-where-without-user.input';
import { UserChatPermissionsUpdateWithWhereUniqueWithoutUserInput } from './user-chat-permissions-update-with-where-unique-without-user.input';
import { UserChatPermissionsUpsertWithWhereUniqueWithoutUserInput } from './user-chat-permissions-upsert-with-where-unique-without-user.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsUpdateManyWithoutUserNestedInput {
  @Field(() => [UserChatPermissionsCreateWithoutUserInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateWithoutUserInput)
  create?: Array<UserChatPermissionsCreateWithoutUserInput>;

  @Field(() => [UserChatPermissionsCreateOrConnectWithoutUserInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateOrConnectWithoutUserInput)
  connectOrCreate?: Array<UserChatPermissionsCreateOrConnectWithoutUserInput>;

  @Field(() => [UserChatPermissionsUpsertWithWhereUniqueWithoutUserInput], { nullable: true })
  @Type(() => UserChatPermissionsUpsertWithWhereUniqueWithoutUserInput)
  upsert?: Array<UserChatPermissionsUpsertWithWhereUniqueWithoutUserInput>;

  @Field(() => UserChatPermissionsCreateManyUserInputEnvelope, { nullable: true })
  @Type(() => UserChatPermissionsCreateManyUserInputEnvelope)
  createMany?: UserChatPermissionsCreateManyUserInputEnvelope;

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

  @Field(() => [UserChatPermissionsUpdateWithWhereUniqueWithoutUserInput], { nullable: true })
  @Type(() => UserChatPermissionsUpdateWithWhereUniqueWithoutUserInput)
  update?: Array<UserChatPermissionsUpdateWithWhereUniqueWithoutUserInput>;

  @Field(() => [UserChatPermissionsUpdateManyWithWhereWithoutUserInput], { nullable: true })
  @Type(() => UserChatPermissionsUpdateManyWithWhereWithoutUserInput)
  updateMany?: Array<UserChatPermissionsUpdateManyWithWhereWithoutUserInput>;

  @Field(() => [UserChatPermissionsScalarWhereInput], { nullable: true })
  @Type(() => UserChatPermissionsScalarWhereInput)
  deleteMany?: Array<UserChatPermissionsScalarWhereInput>;
}
