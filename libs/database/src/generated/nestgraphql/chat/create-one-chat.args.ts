import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatCreateInput } from './chat-create.input';

@ArgsType()
export class CreateOneChatArgs {
  @Field(() => ChatCreateInput, { nullable: false })
  @Type(() => ChatCreateInput)
  data!: ChatCreateInput;
}
