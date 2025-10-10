import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserChatPermissionsCreateWithoutUserInput } from './user-chat-permissions-create-without-user.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsCreateOrConnectWithoutUserInput {
  @Field(() => UserChatPermissionsWhereUniqueInput, { nullable: false })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  where!: Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>;

  @Field(() => UserChatPermissionsCreateWithoutUserInput, { nullable: false })
  @Type(() => UserChatPermissionsCreateWithoutUserInput)
  create!: UserChatPermissionsCreateWithoutUserInput;
}
