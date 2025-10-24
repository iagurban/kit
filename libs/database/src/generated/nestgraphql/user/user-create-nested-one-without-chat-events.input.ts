import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserCreateOrConnectWithoutChatEventsInput } from './user-create-or-connect-without-chat-events.input';
import { UserCreateWithoutChatEventsInput } from './user-create-without-chat-events.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutChatEventsInput {
  @Field(() => UserCreateWithoutChatEventsInput, { nullable: true })
  @Type(() => UserCreateWithoutChatEventsInput)
  create?: UserCreateWithoutChatEventsInput;

  @Field(() => UserCreateOrConnectWithoutChatEventsInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutChatEventsInput)
  connectOrCreate?: UserCreateOrConnectWithoutChatEventsInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;
}
