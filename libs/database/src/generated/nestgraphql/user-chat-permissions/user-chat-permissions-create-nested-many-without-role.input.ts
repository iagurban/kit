import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserChatPermissionsCreateManyRoleInputEnvelope } from './user-chat-permissions-create-many-role-input-envelope.input';
import { UserChatPermissionsCreateOrConnectWithoutRoleInput } from './user-chat-permissions-create-or-connect-without-role.input';
import { UserChatPermissionsCreateWithoutRoleInput } from './user-chat-permissions-create-without-role.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsCreateNestedManyWithoutRoleInput {
  @Field(() => [UserChatPermissionsCreateWithoutRoleInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateWithoutRoleInput)
  create?: Array<UserChatPermissionsCreateWithoutRoleInput>;

  @Field(() => [UserChatPermissionsCreateOrConnectWithoutRoleInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateOrConnectWithoutRoleInput)
  connectOrCreate?: Array<UserChatPermissionsCreateOrConnectWithoutRoleInput>;

  @Field(() => UserChatPermissionsCreateManyRoleInputEnvelope, { nullable: true })
  @Type(() => UserChatPermissionsCreateManyRoleInputEnvelope)
  createMany?: UserChatPermissionsCreateManyRoleInputEnvelope;

  @Field(() => [UserChatPermissionsWhereUniqueInput], { nullable: true })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>>;
}
