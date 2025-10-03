import { Field, InputType } from '@nestjs/graphql';

import { ChatScalarRelationFilter } from '../chat/chat-scalar-relation-filter.input';
import { BigIntFilter } from '../prisma/big-int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';
import { ChatEventChatIdNnCompoundUniqueInput } from './chat-event-chat-id-nn-compound-unique.input';
import { ChatEventWhereInput } from './chat-event-where.input';

@InputType()
export class ChatEventWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: bigint | number;

  @Field(() => ChatEventChatIdNnCompoundUniqueInput, { nullable: true })
  chatId_nn?: ChatEventChatIdNnCompoundUniqueInput;

  @Field(() => [ChatEventWhereInput], { nullable: true })
  AND?: Array<ChatEventWhereInput>;

  @Field(() => [ChatEventWhereInput], { nullable: true })
  OR?: Array<ChatEventWhereInput>;

  @Field(() => [ChatEventWhereInput], { nullable: true })
  NOT?: Array<ChatEventWhereInput>;

  @Field(() => BigIntFilter, { nullable: true })
  nn?: BigIntFilter;

  @Field(() => UuidFilter, { nullable: true })
  chatId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  authorId?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  type?: StringFilter;

  @Field(() => JsonFilter, { nullable: true })
  payload?: JsonFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => ChatScalarRelationFilter, { nullable: true })
  chat?: ChatScalarRelationFilter;

  @Field(() => UserScalarRelationFilter, { nullable: true })
  author?: UserScalarRelationFilter;
}
