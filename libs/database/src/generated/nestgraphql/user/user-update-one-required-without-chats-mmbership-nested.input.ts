import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutChatsMmbershipInput } from './user-create-or-connect-without-chats-mmbership.input';
import { UserCreateWithoutChatsMmbershipInput } from './user-create-without-chats-mmbership.input';
import { UserUpdateToOneWithWhereWithoutChatsMmbershipInput } from './user-update-to-one-with-where-without-chats-mmbership.input';
import { UserUpsertWithoutChatsMmbershipInput } from './user-upsert-without-chats-mmbership.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutChatsMmbershipNestedInput {
  @Field(() => UserCreateWithoutChatsMmbershipInput, { nullable: true })
  @Type(() => UserCreateWithoutChatsMmbershipInput)
  create?: UserCreateWithoutChatsMmbershipInput;

  @Field(() => UserCreateOrConnectWithoutChatsMmbershipInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutChatsMmbershipInput)
  connectOrCreate?: UserCreateOrConnectWithoutChatsMmbershipInput;

  @Field(() => UserUpsertWithoutChatsMmbershipInput, { nullable: true })
  @Type(() => UserUpsertWithoutChatsMmbershipInput)
  upsert?: UserUpsertWithoutChatsMmbershipInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserUpdateToOneWithWhereWithoutChatsMmbershipInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutChatsMmbershipInput)
  update?: UserUpdateToOneWithWhereWithoutChatsMmbershipInput;
}
