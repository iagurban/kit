import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserChatPermissionsUpdateWithoutChatInput } from './user-chat-permissions-update-without-chat.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsUpdateWithWhereUniqueWithoutChatInput {
  @Field(() => UserChatPermissionsWhereUniqueInput, { nullable: false })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  where!: Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>;

  @Field(() => UserChatPermissionsUpdateWithoutChatInput, { nullable: false })
  @Type(() => UserChatPermissionsUpdateWithoutChatInput)
  data!: UserChatPermissionsUpdateWithoutChatInput;
}
