import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventCreateInput } from './chat-event-create.input';

@ArgsType()
export class CreateOneChatEventArgs {
  @Field(() => ChatEventCreateInput, { nullable: false })
  @Type(() => ChatEventCreateInput)
  data!: ChatEventCreateInput;
}
