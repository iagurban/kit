import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatEventMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  nn?: true;

  @Field(() => Boolean, { nullable: true })
  chatId?: true;

  @Field(() => Boolean, { nullable: true })
  authorId?: true;

  @Field(() => Boolean, { nullable: true })
  type?: true;

  @Field(() => Boolean, { nullable: true })
  createdAt?: true;
}
