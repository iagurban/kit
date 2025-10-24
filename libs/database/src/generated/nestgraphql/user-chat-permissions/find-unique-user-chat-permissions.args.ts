import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@ArgsType()
export class FindUniqueUserChatPermissionsArgs {
  @Field(() => UserChatPermissionsWhereUniqueInput, { nullable: false })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  where!: Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>;
}
