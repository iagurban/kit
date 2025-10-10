import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class ChatMemberScalarWhereInput {
  @Field(() => [ChatMemberScalarWhereInput], { nullable: true })
  AND?: Array<ChatMemberScalarWhereInput>;

  @Field(() => [ChatMemberScalarWhereInput], { nullable: true })
  OR?: Array<ChatMemberScalarWhereInput>;

  @Field(() => [ChatMemberScalarWhereInput], { nullable: true })
  NOT?: Array<ChatMemberScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  userId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  chatId?: UuidFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  joinedAt?: DateTimeFilter;
}
