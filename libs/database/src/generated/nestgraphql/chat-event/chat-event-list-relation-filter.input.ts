import { Field, InputType } from '@nestjs/graphql';

import { ChatEventWhereInput } from './chat-event-where.input';

@InputType()
export class ChatEventListRelationFilter {
  @Field(() => ChatEventWhereInput, { nullable: true })
  every?: ChatEventWhereInput;

  @Field(() => ChatEventWhereInput, { nullable: true })
  some?: ChatEventWhereInput;

  @Field(() => ChatEventWhereInput, { nullable: true })
  none?: ChatEventWhereInput;
}
