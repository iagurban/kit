import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserChatPermissionsUpdateInput } from './user-chat-permissions-update.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@ArgsType()
export class UpdateOneUserChatPermissionsArgs {
  @Field(() => UserChatPermissionsUpdateInput, { nullable: false })
  @Type(() => UserChatPermissionsUpdateInput)
  data!: UserChatPermissionsUpdateInput;

  @Field(() => UserChatPermissionsWhereUniqueInput, { nullable: false })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  where!: Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>;
}
