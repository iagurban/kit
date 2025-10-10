import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatCount {
  @Field(() => Int, { nullable: false })
  events?: number;

  @Field(() => Int, { nullable: false })
  userPermissions?: number;

  @Field(() => Int, { nullable: false })
  roles?: number;

  @Field(() => Int, { nullable: false })
  members?: number;
}
