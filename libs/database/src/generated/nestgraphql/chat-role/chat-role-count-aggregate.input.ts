import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatRoleCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  chatId?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;

  @Field(() => Boolean, { nullable: true })
  tags?: true;

  @Field(() => Boolean, { nullable: true })
  permissions?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
