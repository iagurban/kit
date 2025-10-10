import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatRoleCount {
  @Field(() => Int, { nullable: false })
  isDefaultForChats?: number;

  @Field(() => Int, { nullable: false })
  userPermissions?: number;
}
