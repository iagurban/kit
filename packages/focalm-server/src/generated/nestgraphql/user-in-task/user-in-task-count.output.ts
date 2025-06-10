import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserInTaskCount {
  @Field(() => Int, { nullable: false })
  tags?: number;
}
