import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserChatPermissionsMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  userId?: true;

  @Field(() => Boolean, { nullable: true })
  chatId?: true;

  @Field(() => Boolean, { nullable: true })
  roleId?: true;
}
