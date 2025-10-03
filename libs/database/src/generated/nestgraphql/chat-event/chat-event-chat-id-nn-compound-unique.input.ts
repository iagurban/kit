import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatEventChatIdNnCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: false })
  nn!: bigint | number;
}
