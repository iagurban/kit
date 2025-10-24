import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserChatPermissionsUpdateWithoutRoleInput } from './user-chat-permissions-update-without-role.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsUpdateWithWhereUniqueWithoutRoleInput {
  @Field(() => UserChatPermissionsWhereUniqueInput, { nullable: false })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  where!: Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>;

  @Field(() => UserChatPermissionsUpdateWithoutRoleInput, { nullable: false })
  @Type(() => UserChatPermissionsUpdateWithoutRoleInput)
  data!: UserChatPermissionsUpdateWithoutRoleInput;
}
