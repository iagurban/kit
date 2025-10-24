import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateWithoutDefaultRoleInput } from './chat-create-without-default-role.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateOrConnectWithoutDefaultRoleInput {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatCreateWithoutDefaultRoleInput, { nullable: false })
  @Type(() => ChatCreateWithoutDefaultRoleInput)
  create!: ChatCreateWithoutDefaultRoleInput;
}
