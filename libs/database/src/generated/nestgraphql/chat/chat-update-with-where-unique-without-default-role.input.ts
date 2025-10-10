import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatUpdateWithoutDefaultRoleInput } from './chat-update-without-default-role.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUpdateWithWhereUniqueWithoutDefaultRoleInput {
  @Field(() => ChatWhereUniqueInput, { nullable: false })
  @Type(() => ChatWhereUniqueInput)
  where!: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatUpdateWithoutDefaultRoleInput, { nullable: false })
  @Type(() => ChatUpdateWithoutDefaultRoleInput)
  data!: ChatUpdateWithoutDefaultRoleInput;
}
