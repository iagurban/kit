import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutOwnChatsInput } from './user-create-without-own-chats.input';
import { UserUpdateWithoutOwnChatsInput } from './user-update-without-own-chats.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutOwnChatsInput {
  @Field(() => UserUpdateWithoutOwnChatsInput, { nullable: false })
  @Type(() => UserUpdateWithoutOwnChatsInput)
  update!: UserUpdateWithoutOwnChatsInput;

  @Field(() => UserCreateWithoutOwnChatsInput, { nullable: false })
  @Type(() => UserCreateWithoutOwnChatsInput)
  create!: UserCreateWithoutOwnChatsInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
