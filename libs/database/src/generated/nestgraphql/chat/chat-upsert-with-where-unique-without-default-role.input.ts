import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateWithoutDefaultRoleInput } from './chat-create-without-default-role.input';
import { ChatUpdateWithoutDefaultRoleInput } from './chat-update-without-default-role.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUpsertWithWhereUniqueWithoutDefaultRoleInput {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatUpdateWithoutDefaultRoleInput, { nullable: false })
  @Type(() => ChatUpdateWithoutDefaultRoleInput)
  update!: ChatUpdateWithoutDefaultRoleInput;

  @Field(() => ChatCreateWithoutDefaultRoleInput, { nullable: false })
  @Type(() => ChatCreateWithoutDefaultRoleInput)
  create!: ChatCreateWithoutDefaultRoleInput;
}
