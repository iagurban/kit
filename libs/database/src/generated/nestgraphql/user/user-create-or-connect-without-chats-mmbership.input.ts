import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateWithoutChatsMmbershipInput } from './user-create-without-chats-mmbership.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutChatsMmbershipInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserCreateWithoutChatsMmbershipInput, { nullable: false })
  @Type(() => UserCreateWithoutChatsMmbershipInput)
  create!: UserCreateWithoutChatsMmbershipInput;
}
