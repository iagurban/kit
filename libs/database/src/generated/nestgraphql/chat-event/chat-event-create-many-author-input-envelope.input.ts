import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventCreateManyAuthorInput } from './chat-event-create-many-author.input';

@InputType()
export class ChatEventCreateManyAuthorInputEnvelope {
  @Field(() => [ChatEventCreateManyAuthorInput], { nullable: false })
  @Type(() => ChatEventCreateManyAuthorInput)
  data!: Array<ChatEventCreateManyAuthorInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
