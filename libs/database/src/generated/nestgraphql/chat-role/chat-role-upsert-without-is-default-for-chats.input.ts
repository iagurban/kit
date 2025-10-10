import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatRoleCreateWithoutIsDefaultForChatsInput } from './chat-role-create-without-is-default-for-chats.input';
import { ChatRoleUpdateWithoutIsDefaultForChatsInput } from './chat-role-update-without-is-default-for-chats.input';
import { ChatRoleWhereInput } from './chat-role-where.input';

@InputType()
export class ChatRoleUpsertWithoutIsDefaultForChatsInput {
  @Field(() => ChatRoleUpdateWithoutIsDefaultForChatsInput, { nullable: false })
  @Type(() => ChatRoleUpdateWithoutIsDefaultForChatsInput)
  update!: ChatRoleUpdateWithoutIsDefaultForChatsInput;

  @Field(() => ChatRoleCreateWithoutIsDefaultForChatsInput, { nullable: false })
  @Type(() => ChatRoleCreateWithoutIsDefaultForChatsInput)
  create!: ChatRoleCreateWithoutIsDefaultForChatsInput;

  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  where?: ChatRoleWhereInput;
}
