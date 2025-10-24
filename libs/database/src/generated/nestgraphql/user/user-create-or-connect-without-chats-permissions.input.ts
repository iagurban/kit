import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserCreateWithoutChatsPermissionsInput } from './user-create-without-chats-permissions.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutChatsPermissionsInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserCreateWithoutChatsPermissionsInput, { nullable: false })
  @Type(() => UserCreateWithoutChatsPermissionsInput)
  create!: UserCreateWithoutChatsPermissionsInput;
}
