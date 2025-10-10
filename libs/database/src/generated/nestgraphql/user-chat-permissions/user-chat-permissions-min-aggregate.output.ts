import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserChatPermissionsMinAggregate {
  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  chatId?: string;

  @Field(() => String, { nullable: true })
  roleId?: string;
}
