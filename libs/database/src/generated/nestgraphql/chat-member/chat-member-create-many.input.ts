import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatMemberCreateManyInput {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => Date, { nullable: true })
  joinedAt?: Date | string;
}
