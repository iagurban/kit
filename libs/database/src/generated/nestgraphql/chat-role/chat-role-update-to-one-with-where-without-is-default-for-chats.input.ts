import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatRoleUpdateWithoutIsDefaultForChatsInput } from './chat-role-update-without-is-default-for-chats.input';
import { ChatRoleWhereInput } from './chat-role-where.input';

@InputType()
export class ChatRoleUpdateToOneWithWhereWithoutIsDefaultForChatsInput {
  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  where?: ChatRoleWhereInput;

  @Field(() => ChatRoleUpdateWithoutIsDefaultForChatsInput, { nullable: false })
  @Type(() => ChatRoleUpdateWithoutIsDefaultForChatsInput)
  data!: ChatRoleUpdateWithoutIsDefaultForChatsInput;
}
