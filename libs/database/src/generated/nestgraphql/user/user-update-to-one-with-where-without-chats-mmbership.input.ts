import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutChatsMmbershipInput } from './user-update-without-chats-mmbership.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutChatsMmbershipInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutChatsMmbershipInput, { nullable: false })
  @Type(() => UserUpdateWithoutChatsMmbershipInput)
  data!: UserUpdateWithoutChatsMmbershipInput;
}
