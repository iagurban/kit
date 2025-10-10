import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatRoleCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  chatId!: number;

  @Field(() => Int, { nullable: false })
  name!: number;

  @Field(() => Int, { nullable: false })
  tags!: number;

  @Field(() => Int, { nullable: false })
  permissions!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
