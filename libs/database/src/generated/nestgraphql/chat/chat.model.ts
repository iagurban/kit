import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ChatEvent } from '../chat-event/chat-event.model';
import { ChatEventsCounter } from '../chat-events-counter/chat-events-counter.model';
import { MessagesCounter } from '../messages-counter/messages-counter.model';
import { ChatCount } from './chat-count.output';

@ObjectType()
export class Chat {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  bio!: string | null;

  @Field(() => String, { nullable: true })
  avatar!: string | null;

  @Field(() => [ChatEvent], { nullable: true })
  events?: Array<ChatEvent>;

  @Field(() => ChatEventsCounter, { nullable: true })
  eventsCounter?: ChatEventsCounter | null;

  @Field(() => MessagesCounter, { nullable: true })
  messagesCounter?: MessagesCounter | null;

  @Field(() => ChatCount, { nullable: false })
  _count?: ChatCount;
}
