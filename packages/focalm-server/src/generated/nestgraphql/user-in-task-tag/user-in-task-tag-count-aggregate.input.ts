import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskTagCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  userInTaskId?: true;

  @Field(() => Boolean, { nullable: true })
  roleId?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
