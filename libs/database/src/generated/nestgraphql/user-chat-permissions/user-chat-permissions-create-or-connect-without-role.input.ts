import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserChatPermissionsCreateWithoutRoleInput } from './user-chat-permissions-create-without-role.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsCreateOrConnectWithoutRoleInput {
  @Field(() => UserChatPermissionsWhereUniqueInput, { nullable: false })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  where!: Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>;

  @Field(() => UserChatPermissionsCreateWithoutRoleInput, { nullable: false })
  @Type(() => UserChatPermissionsCreateWithoutRoleInput)
  create!: UserChatPermissionsCreateWithoutRoleInput;
}
