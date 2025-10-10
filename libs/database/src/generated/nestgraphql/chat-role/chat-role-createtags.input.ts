import { Field, InputType } from '@nestjs/graphql';

import { ChatRoleTag } from '../prisma/chat-role-tag.enum';

@InputType()
export class ChatRoleCreatetagsInput {
  @Field(() => [ChatRoleTag], { nullable: false })
  set!: Array<`${ChatRoleTag}`>;
}
