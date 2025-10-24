import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateWithoutOwnerInput } from './chat-create-without-owner.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateOrConnectWithoutOwnerInput {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatCreateWithoutOwnerInput, { nullable: false })
  @Type(() => ChatCreateWithoutOwnerInput)
  create!: ChatCreateWithoutOwnerInput;
}
