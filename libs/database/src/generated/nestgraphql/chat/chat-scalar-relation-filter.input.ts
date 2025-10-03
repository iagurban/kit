import { Field, InputType } from '@nestjs/graphql';

import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatScalarRelationFilter {
  @Field(() => ChatWhereInput, { nullable: true })
  is?: ChatWhereInput;

  @Field(() => ChatWhereInput, { nullable: true })
  isNot?: ChatWhereInput;
}
