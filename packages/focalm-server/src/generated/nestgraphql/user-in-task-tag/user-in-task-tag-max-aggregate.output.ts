import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserInTaskTagMaxAggregate {
  @Field(() => String, { nullable: true })
  userInTaskId?: string;

  @Field(() => String, { nullable: true })
  tag?: string;
}
