import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutChatsPermissionsInput } from './user-update-without-chats-permissions.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutChatsPermissionsInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutChatsPermissionsInput, { nullable: false })
  @Type(() => UserUpdateWithoutChatsPermissionsInput)
  data!: UserUpdateWithoutChatsPermissionsInput;
}
