import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatRoleCreateOrConnectWithoutIsDefaultForChatsInput } from './chat-role-create-or-connect-without-is-default-for-chats.input';
import { ChatRoleCreateWithoutIsDefaultForChatsInput } from './chat-role-create-without-is-default-for-chats.input';
import { ChatRoleUpdateToOneWithWhereWithoutIsDefaultForChatsInput } from './chat-role-update-to-one-with-where-without-is-default-for-chats.input';
import { ChatRoleUpsertWithoutIsDefaultForChatsInput } from './chat-role-upsert-without-is-default-for-chats.input';
import { ChatRoleWhereInput } from './chat-role-where.input';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@InputType()
export class ChatRoleUpdateOneWithoutIsDefaultForChatsNestedInput {
  @Field(() => ChatRoleCreateWithoutIsDefaultForChatsInput, { nullable: true })
  @Type(() => ChatRoleCreateWithoutIsDefaultForChatsInput)
  create?: ChatRoleCreateWithoutIsDefaultForChatsInput;

  @Field(() => ChatRoleCreateOrConnectWithoutIsDefaultForChatsInput, { nullable: true })
  @Type(() => ChatRoleCreateOrConnectWithoutIsDefaultForChatsInput)
  connectOrCreate?: ChatRoleCreateOrConnectWithoutIsDefaultForChatsInput;

  @Field(() => ChatRoleUpsertWithoutIsDefaultForChatsInput, { nullable: true })
  @Type(() => ChatRoleUpsertWithoutIsDefaultForChatsInput)
  upsert?: ChatRoleUpsertWithoutIsDefaultForChatsInput;

  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  disconnect?: ChatRoleWhereInput;

  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  delete?: ChatRoleWhereInput;

  @Field(() => ChatRoleWhereUniqueInput, { nullable: true })
  @Type(() => ChatRoleWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>;

  @Field(() => ChatRoleUpdateToOneWithWhereWithoutIsDefaultForChatsInput, { nullable: true })
  @Type(() => ChatRoleUpdateToOneWithWhereWithoutIsDefaultForChatsInput)
  update?: ChatRoleUpdateToOneWithWhereWithoutIsDefaultForChatsInput;
}
