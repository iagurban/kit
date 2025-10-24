import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateWithoutRolesInput } from './chat-create-without-roles.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateOrConnectWithoutRolesInput {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatCreateWithoutRolesInput, { nullable: false })
  @Type(() => ChatCreateWithoutRolesInput)
  create!: ChatCreateWithoutRolesInput;
}
