import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateWithoutUserPermissionsInput } from './chat-create-without-user-permissions.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateOrConnectWithoutUserPermissionsInput {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatCreateWithoutUserPermissionsInput, { nullable: false })
  @Type(() => ChatCreateWithoutUserPermissionsInput)
  create!: ChatCreateWithoutUserPermissionsInput;
}
