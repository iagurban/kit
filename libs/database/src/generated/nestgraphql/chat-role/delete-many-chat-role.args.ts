import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatRoleWhereInput } from './chat-role-where.input';

@ArgsType()
export class DeleteManyChatRoleArgs {
  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  where?: ChatRoleWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
