import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutOwnChatsInput } from './user-update-without-own-chats.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutOwnChatsInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutOwnChatsInput, { nullable: false })
  @Type(() => UserUpdateWithoutOwnChatsInput)
  data!: UserUpdateWithoutOwnChatsInput;
}
