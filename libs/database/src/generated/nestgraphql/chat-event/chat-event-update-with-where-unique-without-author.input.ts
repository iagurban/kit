import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventUpdateWithoutAuthorInput } from './chat-event-update-without-author.input';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@InputType()
export class ChatEventUpdateWithWhereUniqueWithoutAuthorInput {
  @Field(() => ChatEventWhereUniqueInput, { nullable: false })
  @Type(() => ChatEventWhereUniqueInput)
  where!: Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>;

  @Field(() => ChatEventUpdateWithoutAuthorInput, { nullable: false })
  @Type(() => ChatEventUpdateWithoutAuthorInput)
  data!: ChatEventUpdateWithoutAuthorInput;
}
