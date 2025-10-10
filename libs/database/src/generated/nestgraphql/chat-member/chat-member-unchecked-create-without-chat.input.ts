import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatMemberUncheckedCreateWithoutChatInput {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => Date, { nullable: true })
  joinedAt?: Date | string;
}
