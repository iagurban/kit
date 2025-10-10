import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatMemberWhereInput } from './chat-member-where.input';

@ArgsType()
export class DeleteManyChatMemberArgs {
  @Field(() => ChatMemberWhereInput, { nullable: true })
  @Type(() => ChatMemberWhereInput)
  where?: ChatMemberWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
