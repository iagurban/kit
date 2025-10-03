import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatEventMaxAggregate {
  @Field(() => String, { nullable: true })
  id?: bigint | number;

  @Field(() => String, { nullable: true })
  nn?: bigint | number;

  @Field(() => String, { nullable: true })
  chatId?: string;

  @Field(() => String, { nullable: true })
  authorId?: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;
}
