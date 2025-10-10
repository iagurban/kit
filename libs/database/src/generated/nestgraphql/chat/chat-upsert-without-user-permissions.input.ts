import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatCreateWithoutUserPermissionsInput } from './chat-create-without-user-permissions.input';
import { ChatUpdateWithoutUserPermissionsInput } from './chat-update-without-user-permissions.input';
import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatUpsertWithoutUserPermissionsInput {
  @Field(() => ChatUpdateWithoutUserPermissionsInput, { nullable: false })
  @Type(() => ChatUpdateWithoutUserPermissionsInput)
  update!: ChatUpdateWithoutUserPermissionsInput;

  @Field(() => ChatCreateWithoutUserPermissionsInput, { nullable: false })
  @Type(() => ChatCreateWithoutUserPermissionsInput)
  create!: ChatCreateWithoutUserPermissionsInput;

  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;
}
