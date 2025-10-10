import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserChatPermissionsUpdateWithoutUserInput } from './user-chat-permissions-update-without-user.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsUpdateWithWhereUniqueWithoutUserInput {
  @Field(() => UserChatPermissionsWhereUniqueInput, { nullable: false })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  where!: Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>;

  @Field(() => UserChatPermissionsUpdateWithoutUserInput, { nullable: false })
  @Type(() => UserChatPermissionsUpdateWithoutUserInput)
  data!: UserChatPermissionsUpdateWithoutUserInput;
}
