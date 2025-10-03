import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Chat } from '../chat/chat.model';

@ObjectType()
export class ChatEventsCounter {
  @Field(() => ID, { nullable: false })
  chatId!: string;

  @Field(() => String, { defaultValue: '0', nullable: false })
  lastNn!: bigint;

  @Field(() => Chat, { nullable: false })
  chat?: Chat;
}
