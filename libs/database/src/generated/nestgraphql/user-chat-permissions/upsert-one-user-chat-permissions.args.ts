import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserChatPermissionsCreateInput } from './user-chat-permissions-create.input';
import { UserChatPermissionsUpdateInput } from './user-chat-permissions-update.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@ArgsType()
export class UpsertOneUserChatPermissionsArgs {
  @Field(() => UserChatPermissionsWhereUniqueInput, { nullable: false })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  where!: Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>;

  @Field(() => UserChatPermissionsCreateInput, { nullable: false })
  @Type(() => UserChatPermissionsCreateInput)
  create!: UserChatPermissionsCreateInput;

  @Field(() => UserChatPermissionsUpdateInput, { nullable: false })
  @Type(() => UserChatPermissionsUpdateInput)
  update!: UserChatPermissionsUpdateInput;
}
