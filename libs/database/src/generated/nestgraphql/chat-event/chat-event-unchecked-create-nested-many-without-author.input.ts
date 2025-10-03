import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatEventCreateManyAuthorInputEnvelope } from './chat-event-create-many-author-input-envelope.input';
import { ChatEventCreateOrConnectWithoutAuthorInput } from './chat-event-create-or-connect-without-author.input';
import { ChatEventCreateWithoutAuthorInput } from './chat-event-create-without-author.input';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@InputType()
export class ChatEventUncheckedCreateNestedManyWithoutAuthorInput {
  @Field(() => [ChatEventCreateWithoutAuthorInput], { nullable: true })
  @Type(() => ChatEventCreateWithoutAuthorInput)
  create?: Array<ChatEventCreateWithoutAuthorInput>;

  @Field(() => [ChatEventCreateOrConnectWithoutAuthorInput], { nullable: true })
  @Type(() => ChatEventCreateOrConnectWithoutAuthorInput)
  connectOrCreate?: Array<ChatEventCreateOrConnectWithoutAuthorInput>;

  @Field(() => ChatEventCreateManyAuthorInputEnvelope, { nullable: true })
  @Type(() => ChatEventCreateManyAuthorInputEnvelope)
  createMany?: ChatEventCreateManyAuthorInputEnvelope;

  @Field(() => [ChatEventWhereUniqueInput], { nullable: true })
  @Type(() => ChatEventWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>>;
}
