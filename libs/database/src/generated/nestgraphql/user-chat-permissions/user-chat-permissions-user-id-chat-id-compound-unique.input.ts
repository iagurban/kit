import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserChatPermissionsUserIdChatIdCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  chatId!: string;
}
