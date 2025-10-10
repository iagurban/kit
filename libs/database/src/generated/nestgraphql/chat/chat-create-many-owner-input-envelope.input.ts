import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatCreateManyOwnerInput } from './chat-create-many-owner.input';

@InputType()
export class ChatCreateManyOwnerInputEnvelope {
  @Field(() => [ChatCreateManyOwnerInput], { nullable: false })
  @Type(() => ChatCreateManyOwnerInput)
  data!: Array<ChatCreateManyOwnerInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
