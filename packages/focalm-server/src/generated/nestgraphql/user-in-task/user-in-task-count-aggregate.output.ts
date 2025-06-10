import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserInTaskCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => Int, { nullable: false })
  taskId!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
