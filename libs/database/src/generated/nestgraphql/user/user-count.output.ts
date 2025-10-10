import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCount {
  @Field(() => Int, { nullable: false })
  uploadedFiles?: number;

  @Field(() => Int, { nullable: false })
  refreshTokens?: number;

  @Field(() => Int, { nullable: false })
  chatEvents?: number;

  @Field(() => Int, { nullable: false })
  chatsPermissions?: number;

  @Field(() => Int, { nullable: false })
  chatsMmbership?: number;

  @Field(() => Int, { nullable: false })
  ownChats?: number;
}
