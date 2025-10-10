import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatMemberMaxAggregate {
  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  chatId?: string;

  @Field(() => Date, { nullable: true })
  joinedAt?: Date | string;
}
