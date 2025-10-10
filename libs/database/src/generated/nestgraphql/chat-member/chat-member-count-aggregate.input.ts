import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatMemberCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  userId?: true;

  @Field(() => Boolean, { nullable: true })
  chatId?: true;

  @Field(() => Boolean, { nullable: true })
  joinedAt?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
