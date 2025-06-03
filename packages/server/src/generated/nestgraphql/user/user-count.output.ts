import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCount {
  @Field(() => Int, { nullable: false })
  menus?: number;

  @Field(() => Int, { nullable: false })
  uploadedFiles?: number;

  @Field(() => Int, { nullable: false })
  refreshTokens?: number;
}
