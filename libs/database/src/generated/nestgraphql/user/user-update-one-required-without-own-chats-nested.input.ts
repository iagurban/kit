import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserCreateOrConnectWithoutOwnChatsInput } from './user-create-or-connect-without-own-chats.input';
import { UserCreateWithoutOwnChatsInput } from './user-create-without-own-chats.input';
import { UserUpdateToOneWithWhereWithoutOwnChatsInput } from './user-update-to-one-with-where-without-own-chats.input';
import { UserUpsertWithoutOwnChatsInput } from './user-upsert-without-own-chats.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutOwnChatsNestedInput {
  @Field(() => UserCreateWithoutOwnChatsInput, { nullable: true })
  @Type(() => UserCreateWithoutOwnChatsInput)
  create?: UserCreateWithoutOwnChatsInput;

  @Field(() => UserCreateOrConnectWithoutOwnChatsInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutOwnChatsInput)
  connectOrCreate?: UserCreateOrConnectWithoutOwnChatsInput;

  @Field(() => UserUpsertWithoutOwnChatsInput, { nullable: true })
  @Type(() => UserUpsertWithoutOwnChatsInput)
  upsert?: UserUpsertWithoutOwnChatsInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserUpdateToOneWithWhereWithoutOwnChatsInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutOwnChatsInput)
  update?: UserUpdateToOneWithWhereWithoutOwnChatsInput;
}
