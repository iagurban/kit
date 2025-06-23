import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserInTaskTagCountAggregate {
  @Field(() => Int, { nullable: false })
  userInTaskId!: number;

  @Field(() => Int, { nullable: false })
  roleId!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
