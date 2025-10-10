import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatMemberCountAggregate {
  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => Int, { nullable: false })
  chatId!: number;

  @Field(() => Int, { nullable: false })
  joinedAt!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
