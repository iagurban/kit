import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserChatPermissionsCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  userId?: true;

  @Field(() => Boolean, { nullable: true })
  chatId?: true;

  @Field(() => Boolean, { nullable: true })
  roleId?: true;

  @Field(() => Boolean, { nullable: true })
  permissions?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
