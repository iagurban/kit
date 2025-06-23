import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserInProjectCountAggregate {
  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => Int, { nullable: false })
  projectId!: number;

  @Field(() => Int, { nullable: false })
  permission!: number;

  @Field(() => Int, { nullable: false })
  kind!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
