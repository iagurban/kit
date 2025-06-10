import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserInTaskTagMinAggregate {
  @Field(() => String, { nullable: true })
  userInTaskId?: string;

  @Field(() => String, { nullable: true })
  tag?: string;
}
