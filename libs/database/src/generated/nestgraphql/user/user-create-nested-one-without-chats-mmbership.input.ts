import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserCreateOrConnectWithoutChatsMmbershipInput } from './user-create-or-connect-without-chats-mmbership.input';
import { UserCreateWithoutChatsMmbershipInput } from './user-create-without-chats-mmbership.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutChatsMmbershipInput {
  @Field(() => UserCreateWithoutChatsMmbershipInput, { nullable: true })
  @Type(() => UserCreateWithoutChatsMmbershipInput)
  create?: UserCreateWithoutChatsMmbershipInput;

  @Field(() => UserCreateOrConnectWithoutChatsMmbershipInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutChatsMmbershipInput)
  connectOrCreate?: UserCreateOrConnectWithoutChatsMmbershipInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;
}
