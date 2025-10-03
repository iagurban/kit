import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventCreateManyInput } from './chat-event-create-many.input';

@ArgsType()
export class CreateManyChatEventArgs {
  @Field(() => [ChatEventCreateManyInput], { nullable: false })
  @Type(() => ChatEventCreateManyInput)
  data!: Array<ChatEventCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
