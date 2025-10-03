import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutChatEventsInput } from './user-update-without-chat-events.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutChatEventsInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutChatEventsInput, { nullable: false })
  @Type(() => UserUpdateWithoutChatEventsInput)
  data!: UserUpdateWithoutChatEventsInput;
}
