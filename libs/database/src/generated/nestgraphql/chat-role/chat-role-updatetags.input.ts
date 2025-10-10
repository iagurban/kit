import { Field, InputType } from '@nestjs/graphql';

import { ChatRoleTag } from '../prisma/chat-role-tag.enum';

@InputType()
export class ChatRoleUpdatetagsInput {
  @Field(() => [ChatRoleTag], { nullable: true })
  set?: Array<`${ChatRoleTag}`>;

  @Field(() => [ChatRoleTag], { nullable: true })
  push?: Array<`${ChatRoleTag}`>;
}
