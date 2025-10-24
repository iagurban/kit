import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateWithoutMembersInput } from './chat-create-without-members.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateOrConnectWithoutMembersInput {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatCreateWithoutMembersInput, { nullable: false })
  @Type(() => ChatCreateWithoutMembersInput)
  create!: ChatCreateWithoutMembersInput;
}
