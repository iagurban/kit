import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutChatsPermissionsInput } from './user-create-or-connect-without-chats-permissions.input';
import { UserCreateWithoutChatsPermissionsInput } from './user-create-without-chats-permissions.input';
import { UserUpdateToOneWithWhereWithoutChatsPermissionsInput } from './user-update-to-one-with-where-without-chats-permissions.input';
import { UserUpsertWithoutChatsPermissionsInput } from './user-upsert-without-chats-permissions.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutChatsPermissionsNestedInput {
  @Field(() => UserCreateWithoutChatsPermissionsInput, { nullable: true })
  @Type(() => UserCreateWithoutChatsPermissionsInput)
  create?: UserCreateWithoutChatsPermissionsInput;

  @Field(() => UserCreateOrConnectWithoutChatsPermissionsInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutChatsPermissionsInput)
  connectOrCreate?: UserCreateOrConnectWithoutChatsPermissionsInput;

  @Field(() => UserUpsertWithoutChatsPermissionsInput, { nullable: true })
  @Type(() => UserUpsertWithoutChatsPermissionsInput)
  upsert?: UserUpsertWithoutChatsPermissionsInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserUpdateToOneWithWhereWithoutChatsPermissionsInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutChatsPermissionsInput)
  update?: UserUpdateToOneWithWhereWithoutChatsPermissionsInput;
}
