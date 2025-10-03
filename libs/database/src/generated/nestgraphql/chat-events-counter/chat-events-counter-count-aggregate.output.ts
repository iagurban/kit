import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatEventsCounterCountAggregate {
  @Field(() => Int, { nullable: false })
  chatId!: number;

  @Field(() => Int, { nullable: false })
  lastNn!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
