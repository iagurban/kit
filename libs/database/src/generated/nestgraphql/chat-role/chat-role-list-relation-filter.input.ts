import { Field, InputType } from '@nestjs/graphql';

import { ChatRoleWhereInput } from './chat-role-where.input';

@InputType()
export class ChatRoleListRelationFilter {
  @Field(() => ChatRoleWhereInput, { nullable: true })
  every?: ChatRoleWhereInput;

  @Field(() => ChatRoleWhereInput, { nullable: true })
  some?: ChatRoleWhereInput;

  @Field(() => ChatRoleWhereInput, { nullable: true })
  none?: ChatRoleWhereInput;
}
