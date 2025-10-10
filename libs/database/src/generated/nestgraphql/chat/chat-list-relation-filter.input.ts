import { Field, InputType } from '@nestjs/graphql';

import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatListRelationFilter {
  @Field(() => ChatWhereInput, { nullable: true })
  every?: ChatWhereInput;

  @Field(() => ChatWhereInput, { nullable: true })
  some?: ChatWhereInput;

  @Field(() => ChatWhereInput, { nullable: true })
  none?: ChatWhereInput;
}
