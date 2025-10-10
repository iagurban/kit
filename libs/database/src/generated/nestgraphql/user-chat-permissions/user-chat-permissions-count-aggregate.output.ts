import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserChatPermissionsCountAggregate {
  @Field(() => Int, { nullable: false })
  userId!: number;

  @Field(() => Int, { nullable: false })
  chatId!: number;

  @Field(() => Int, { nullable: false })
  roleId!: number;

  @Field(() => Int, { nullable: false })
  permissions!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
