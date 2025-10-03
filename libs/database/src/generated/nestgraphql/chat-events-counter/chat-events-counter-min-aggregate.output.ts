import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatEventsCounterMinAggregate {
  @Field(() => String, { nullable: true })
  chatId?: string;

  @Field(() => String, { nullable: true })
  lastNn?: bigint | number;
}
