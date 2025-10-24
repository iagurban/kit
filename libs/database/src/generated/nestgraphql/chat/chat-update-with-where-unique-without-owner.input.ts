import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatUpdateWithoutOwnerInput } from './chat-update-without-owner.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUpdateWithWhereUniqueWithoutOwnerInput {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatUpdateWithoutOwnerInput, { nullable: false })
  @Type(() => ChatUpdateWithoutOwnerInput)
  data!: ChatUpdateWithoutOwnerInput;
}
