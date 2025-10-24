import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserChatPermissionsCreateManyRoleInputEnvelope } from './user-chat-permissions-create-many-role-input-envelope.input';
import { UserChatPermissionsCreateOrConnectWithoutRoleInput } from './user-chat-permissions-create-or-connect-without-role.input';
import { UserChatPermissionsCreateWithoutRoleInput } from './user-chat-permissions-create-without-role.input';
import { UserChatPermissionsScalarWhereInput } from './user-chat-permissions-scalar-where.input';
import { UserChatPermissionsUpdateManyWithWhereWithoutRoleInput } from './user-chat-permissions-update-many-with-where-without-role.input';
import { UserChatPermissionsUpdateWithWhereUniqueWithoutRoleInput } from './user-chat-permissions-update-with-where-unique-without-role.input';
import { UserChatPermissionsUpsertWithWhereUniqueWithoutRoleInput } from './user-chat-permissions-upsert-with-where-unique-without-role.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsUpdateManyWithoutRoleNestedInput {
  @Field(() => [UserChatPermissionsCreateWithoutRoleInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateWithoutRoleInput)
  create?: Array<UserChatPermissionsCreateWithoutRoleInput>;

  @Field(() => [UserChatPermissionsCreateOrConnectWithoutRoleInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateOrConnectWithoutRoleInput)
  connectOrCreate?: Array<UserChatPermissionsCreateOrConnectWithoutRoleInput>;

  @Field(() => [UserChatPermissionsUpsertWithWhereUniqueWithoutRoleInput], { nullable: true })
  @Type(() => UserChatPermissionsUpsertWithWhereUniqueWithoutRoleInput)
  upsert?: Array<UserChatPermissionsUpsertWithWhereUniqueWithoutRoleInput>;

  @Field(() => UserChatPermissionsCreateManyRoleInputEnvelope, { nullable: true })
  @Type(() => UserChatPermissionsCreateManyRoleInputEnvelope)
  createMany?: UserChatPermissionsCreateManyRoleInputEnvelope;

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

  @Field(() => [UserChatPermissionsUpdateWithWhereUniqueWithoutRoleInput], { nullable: true })
  @Type(() => UserChatPermissionsUpdateWithWhereUniqueWithoutRoleInput)
  update?: Array<UserChatPermissionsUpdateWithWhereUniqueWithoutRoleInput>;

  @Field(() => [UserChatPermissionsUpdateManyWithWhereWithoutRoleInput], { nullable: true })
  @Type(() => UserChatPermissionsUpdateManyWithWhereWithoutRoleInput)
  updateMany?: Array<UserChatPermissionsUpdateManyWithWhereWithoutRoleInput>;

  @Field(() => [UserChatPermissionsScalarWhereInput], { nullable: true })
  @Type(() => UserChatPermissionsScalarWhereInput)
  deleteMany?: Array<UserChatPermissionsScalarWhereInput>;
}
