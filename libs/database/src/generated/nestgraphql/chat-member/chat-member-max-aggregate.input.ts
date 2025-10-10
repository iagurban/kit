import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatMemberMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  userId?: true;

  @Field(() => Boolean, { nullable: true })
  chatId?: true;

  @Field(() => Boolean, { nullable: true })
  joinedAt?: true;
}
