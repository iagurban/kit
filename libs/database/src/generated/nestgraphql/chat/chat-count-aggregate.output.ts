import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  title!: number;

  @Field(() => Int, { nullable: false })
  bio!: number;

  @Field(() => Int, { nullable: false })
  avatar!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
