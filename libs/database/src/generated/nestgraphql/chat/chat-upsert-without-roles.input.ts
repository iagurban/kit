import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatCreateWithoutRolesInput } from './chat-create-without-roles.input';
import { ChatUpdateWithoutRolesInput } from './chat-update-without-roles.input';
import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatUpsertWithoutRolesInput {
  @Field(() => ChatUpdateWithoutRolesInput, { nullable: false })
  @Type(() => ChatUpdateWithoutRolesInput)
  update!: ChatUpdateWithoutRolesInput;

  @Field(() => ChatCreateWithoutRolesInput, { nullable: false })
  @Type(() => ChatCreateWithoutRolesInput)
  create!: ChatCreateWithoutRolesInput;

  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;
}
