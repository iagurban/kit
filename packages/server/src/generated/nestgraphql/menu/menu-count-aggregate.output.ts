import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MenuCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  createdAt!: number;

  @Field(() => Int, { nullable: false })
  title!: number;

  @Field(() => Int, { nullable: false })
  ownerId!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
