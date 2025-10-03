import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatWhereInput } from './chat-where.input';

@ArgsType()
export class DeleteManyChatArgs {
  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
