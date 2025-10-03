import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatEventAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;

  @Field(() => Float, { nullable: true })
  nn?: number;
}
