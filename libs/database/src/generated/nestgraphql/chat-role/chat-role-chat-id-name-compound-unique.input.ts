import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatRoleChatIdNameCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: false })
  name!: string;
}
