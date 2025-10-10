import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatRoleCreateWithoutUserPermissionsInput } from './chat-role-create-without-user-permissions.input';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@InputType()
export class ChatRoleCreateOrConnectWithoutUserPermissionsInput {
  @Field(() => ChatRoleWhereUniqueInput, { nullable: false })
  @Type(() => ChatRoleWhereUniqueInput)
  where!: Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>;

  @Field(() => ChatRoleCreateWithoutUserPermissionsInput, { nullable: false })
  @Type(() => ChatRoleCreateWithoutUserPermissionsInput)
  create!: ChatRoleCreateWithoutUserPermissionsInput;
}
