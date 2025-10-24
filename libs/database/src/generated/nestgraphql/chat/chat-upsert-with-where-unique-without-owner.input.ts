import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateWithoutOwnerInput } from './chat-create-without-owner.input';
import { ChatUpdateWithoutOwnerInput } from './chat-update-without-owner.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUpsertWithWhereUniqueWithoutOwnerInput {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatUpdateWithoutOwnerInput, { nullable: false })
  @Type(() => ChatUpdateWithoutOwnerInput)
  update!: ChatUpdateWithoutOwnerInput;

  @Field(() => ChatCreateWithoutOwnerInput, { nullable: false })
  @Type(() => ChatCreateWithoutOwnerInput)
  create!: ChatCreateWithoutOwnerInput;
}
