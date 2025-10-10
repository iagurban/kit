import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutChatsMmbershipInput } from './user-create-without-chats-mmbership.input';
import { UserUpdateWithoutChatsMmbershipInput } from './user-update-without-chats-mmbership.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutChatsMmbershipInput {
  @Field(() => UserUpdateWithoutChatsMmbershipInput, { nullable: false })
  @Type(() => UserUpdateWithoutChatsMmbershipInput)
  update!: UserUpdateWithoutChatsMmbershipInput;

  @Field(() => UserCreateWithoutChatsMmbershipInput, { nullable: false })
  @Type(() => UserCreateWithoutChatsMmbershipInput)
  create!: UserCreateWithoutChatsMmbershipInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
