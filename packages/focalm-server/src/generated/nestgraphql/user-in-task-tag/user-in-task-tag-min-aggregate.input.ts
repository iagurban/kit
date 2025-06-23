import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskTagMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  userInTaskId?: true;

  @Field(() => Boolean, { nullable: true })
  roleId?: true;
}
