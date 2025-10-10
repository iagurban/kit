import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatMemberUncheckedCreateWithoutUserInput {
  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => Date, { nullable: true })
  joinedAt?: Date | string;
}
