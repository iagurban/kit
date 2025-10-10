import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatRoleCreateInput } from './chat-role-create.input';

@ArgsType()
export class CreateOneChatRoleArgs {
  @Field(() => ChatRoleCreateInput, { nullable: false })
  @Type(() => ChatRoleCreateInput)
  data!: ChatRoleCreateInput;
}
