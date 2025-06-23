import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskTagMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  userInTaskId?: true;

  @Field(() => Boolean, { nullable: true })
  roleId?: true;
}
