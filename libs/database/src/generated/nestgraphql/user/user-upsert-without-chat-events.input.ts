import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutChatEventsInput } from './user-create-without-chat-events.input';
import { UserUpdateWithoutChatEventsInput } from './user-update-without-chat-events.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutChatEventsInput {
  @Field(() => UserUpdateWithoutChatEventsInput, { nullable: false })
  @Type(() => UserUpdateWithoutChatEventsInput)
  update!: UserUpdateWithoutChatEventsInput;

  @Field(() => UserCreateWithoutChatEventsInput, { nullable: false })
  @Type(() => UserCreateWithoutChatEventsInput)
  create!: UserCreateWithoutChatEventsInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
