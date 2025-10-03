import { Field, InputType } from '@nestjs/graphql';

import { MessagesCounterWhereInput } from './messages-counter-where.input';

@InputType()
export class MessagesCounterNullableScalarRelationFilter {
  @Field(() => MessagesCounterWhereInput, { nullable: true })
  is?: MessagesCounterWhereInput;

  @Field(() => MessagesCounterWhereInput, { nullable: true })
  isNot?: MessagesCounterWhereInput;
}
