import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatEventCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  nn!: number;

  @Field(() => Int, { nullable: false })
  chatId!: number;

  @Field(() => Int, { nullable: false })
  authorId!: number;

  @Field(() => Int, { nullable: false })
  type!: number;

  @Field(() => Int, { nullable: false })
  payload!: number;

  @Field(() => Int, { nullable: false })
  createdAt!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
