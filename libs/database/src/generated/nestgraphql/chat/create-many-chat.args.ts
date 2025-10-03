import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatCreateManyInput } from './chat-create-many.input';

@ArgsType()
export class CreateManyChatArgs {
  @Field(() => [ChatCreateManyInput], { nullable: false })
  @Type(() => ChatCreateManyInput)
  data!: Array<ChatCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
