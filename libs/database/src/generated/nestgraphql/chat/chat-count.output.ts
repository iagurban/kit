import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatCount {
  @Field(() => Int, { nullable: false })
  events?: number;
}
