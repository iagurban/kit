import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutChatsPermissionsInput } from './user-create-without-chats-permissions.input';
import { UserUpdateWithoutChatsPermissionsInput } from './user-update-without-chats-permissions.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutChatsPermissionsInput {
  @Field(() => UserUpdateWithoutChatsPermissionsInput, { nullable: false })
  @Type(() => UserUpdateWithoutChatsPermissionsInput)
  update!: UserUpdateWithoutChatsPermissionsInput;

  @Field(() => UserCreateWithoutChatsPermissionsInput, { nullable: false })
  @Type(() => UserCreateWithoutChatsPermissionsInput)
  create!: UserCreateWithoutChatsPermissionsInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
