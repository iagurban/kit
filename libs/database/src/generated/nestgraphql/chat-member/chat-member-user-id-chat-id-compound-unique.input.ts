import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatMemberUserIdChatIdCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  chatId!: string;
}
