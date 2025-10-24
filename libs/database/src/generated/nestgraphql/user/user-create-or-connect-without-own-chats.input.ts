import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserCreateWithoutOwnChatsInput } from './user-create-without-own-chats.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutOwnChatsInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserCreateWithoutOwnChatsInput, { nullable: false })
  @Type(() => UserCreateWithoutOwnChatsInput)
  create!: UserCreateWithoutOwnChatsInput;
}
