import { Field, InputType } from '@nestjs/graphql';

import { ChatRoleWhereInput } from './chat-role-where.input';

@InputType()
export class ChatRoleNullableScalarRelationFilter {
  @Field(() => ChatRoleWhereInput, { nullable: true })
  is?: ChatRoleWhereInput;

  @Field(() => ChatRoleWhereInput, { nullable: true })
  isNot?: ChatRoleWhereInput;
}
