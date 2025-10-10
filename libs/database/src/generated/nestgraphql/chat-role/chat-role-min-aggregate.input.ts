import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatRoleMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  chatId?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;
}
