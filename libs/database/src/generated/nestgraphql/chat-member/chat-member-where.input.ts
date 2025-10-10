import { Field, InputType } from '@nestjs/graphql';

import { ChatScalarRelationFilter } from '../chat/chat-scalar-relation-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';

@InputType()
export class ChatMemberWhereInput {
  @Field(() => [ChatMemberWhereInput], { nullable: true })
  AND?: Array<ChatMemberWhereInput>;

  @Field(() => [ChatMemberWhereInput], { nullable: true })
  OR?: Array<ChatMemberWhereInput>;

  @Field(() => [ChatMemberWhereInput], { nullable: true })
  NOT?: Array<ChatMemberWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  userId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  chatId?: UuidFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  joinedAt?: DateTimeFilter;

  @Field(() => UserScalarRelationFilter, { nullable: true })
  user?: UserScalarRelationFilter;

  @Field(() => ChatScalarRelationFilter, { nullable: true })
  chat?: ChatScalarRelationFilter;
}
