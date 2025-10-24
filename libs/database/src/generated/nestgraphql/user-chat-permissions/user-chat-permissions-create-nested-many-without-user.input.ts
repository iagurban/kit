import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserChatPermissionsCreateManyUserInputEnvelope } from './user-chat-permissions-create-many-user-input-envelope.input';
import { UserChatPermissionsCreateOrConnectWithoutUserInput } from './user-chat-permissions-create-or-connect-without-user.input';
import { UserChatPermissionsCreateWithoutUserInput } from './user-chat-permissions-create-without-user.input';
import { UserChatPermissionsWhereUniqueInput } from './user-chat-permissions-where-unique.input';

@InputType()
export class UserChatPermissionsCreateNestedManyWithoutUserInput {
  @Field(() => [UserChatPermissionsCreateWithoutUserInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateWithoutUserInput)
  create?: Array<UserChatPermissionsCreateWithoutUserInput>;

  @Field(() => [UserChatPermissionsCreateOrConnectWithoutUserInput], { nullable: true })
  @Type(() => UserChatPermissionsCreateOrConnectWithoutUserInput)
  connectOrCreate?: Array<UserChatPermissionsCreateOrConnectWithoutUserInput>;

  @Field(() => UserChatPermissionsCreateManyUserInputEnvelope, { nullable: true })
  @Type(() => UserChatPermissionsCreateManyUserInputEnvelope)
  createMany?: UserChatPermissionsCreateManyUserInputEnvelope;

  @Field(() => [UserChatPermissionsWhereUniqueInput], { nullable: true })
  @Type(() => UserChatPermissionsWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserChatPermissionsWhereUniqueInput, 'userId_chatId'>>;
}
