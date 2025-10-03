import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventWhereInput } from './chat-event-where.input';

@ArgsType()
export class DeleteManyChatEventArgs {
  @Field(() => ChatEventWhereInput, { nullable: true })
  @Type(() => ChatEventWhereInput)
  where?: ChatEventWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
