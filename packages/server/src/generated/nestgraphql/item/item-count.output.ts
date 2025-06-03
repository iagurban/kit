import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ItemCount {
  @Field(() => Int, { nullable: false })
  children?: number;
}
