import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatMemberCreateManyInput } from './chat-member-create-many.input';

@ArgsType()
export class CreateManyChatMemberArgs {
  @Field(() => [ChatMemberCreateManyInput], { nullable: false })
  @Type(() => ChatMemberCreateManyInput)
  data!: Array<ChatMemberCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
