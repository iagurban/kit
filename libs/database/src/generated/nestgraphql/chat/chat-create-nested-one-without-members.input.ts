import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateOrConnectWithoutMembersInput } from './chat-create-or-connect-without-members.input';
import { ChatCreateWithoutMembersInput } from './chat-create-without-members.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateNestedOneWithoutMembersInput {
  @Field(() => ChatCreateWithoutMembersInput, { nullable: true })
  @Type(() => ChatCreateWithoutMembersInput)
  create?: ChatCreateWithoutMembersInput;

  @Field(() => ChatCreateOrConnectWithoutMembersInput, { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutMembersInput)
  connectOrCreate?: ChatCreateOrConnectWithoutMembersInput;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;
}
