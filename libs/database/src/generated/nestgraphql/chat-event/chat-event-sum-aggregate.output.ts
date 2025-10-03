import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatEventSumAggregate {
  @Field(() => String, { nullable: true })
  id?: bigint | number;

  @Field(() => String, { nullable: true })
  nn?: bigint | number;
}
