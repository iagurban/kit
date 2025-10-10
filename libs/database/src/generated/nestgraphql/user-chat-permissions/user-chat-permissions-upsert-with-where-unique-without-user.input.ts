import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserChatPermissionsCreateWithoutUserInput } from './user-chat-permissions-create-without-user.input';
import { UserChatPermissionsUpdateWithoutUserInput } from './user-chat-permissions-update-without-user.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsUpsertWithWhereUniqueWithoutUserInput {
  @Field(() => UserChatPermissionsWhereUniqueInput, { nullable: false })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  where!: Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>;

  @Field(() => UserChatPermissionsUpdateWithoutUserInput, { nullable: false })
  @Type(() => UserChatPermissionsUpdateWithoutUserInput)
  update!: UserChatPermissionsUpdateWithoutUserInput;

  @Field(() => UserChatPermissionsCreateWithoutUserInput, { nullable: false })
  @Type(() => UserChatPermissionsCreateWithoutUserInput)
  create!: UserChatPermissionsCreateWithoutUserInput;
}
