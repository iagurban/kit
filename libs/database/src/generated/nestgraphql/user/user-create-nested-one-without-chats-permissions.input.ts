import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutChatsPermissionsInput } from './user-create-or-connect-without-chats-permissions.input';
import { UserCreateWithoutChatsPermissionsInput } from './user-create-without-chats-permissions.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutChatsPermissionsInput {
  @Field(() => UserCreateWithoutChatsPermissionsInput, { nullable: true })
  @Type(() => UserCreateWithoutChatsPermissionsInput)
  create?: UserCreateWithoutChatsPermissionsInput;

  @Field(() => UserCreateOrConnectWithoutChatsPermissionsInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutChatsPermissionsInput)
  connectOrCreate?: UserCreateOrConnectWithoutChatsPermissionsInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;
}
