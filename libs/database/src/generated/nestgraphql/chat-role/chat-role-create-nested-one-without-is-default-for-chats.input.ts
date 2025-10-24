import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatRoleCreateOrConnectWithoutIsDefaultForChatsInput } from './chat-role-create-or-connect-without-is-default-for-chats.input';
import { ChatRoleCreateWithoutIsDefaultForChatsInput } from './chat-role-create-without-is-default-for-chats.input';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@InputType()
export class ChatRoleCreateNestedOneWithoutIsDefaultForChatsInput {
  @Field(() => ChatRoleCreateWithoutIsDefaultForChatsInput, { nullable: true })
  @Type(() => ChatRoleCreateWithoutIsDefaultForChatsInput)
  create?: ChatRoleCreateWithoutIsDefaultForChatsInput;

  @Field(() => ChatRoleCreateOrConnectWithoutIsDefaultForChatsInput, { nullable: true })
  @Type(() => ChatRoleCreateOrConnectWithoutIsDefaultForChatsInput)
  connectOrCreate?: ChatRoleCreateOrConnectWithoutIsDefaultForChatsInput;

  @Field(() => ChatRoleWhereUniqueInput, { nullable: true })
  @Type(() => ChatRoleWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>;
}
