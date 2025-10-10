import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatUpdateWithoutUserPermissionsInput } from './chat-update-without-user-permissions.input';
import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatUpdateToOneWithWhereWithoutUserPermissionsInput {
  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;

  @Field(() => ChatUpdateWithoutUserPermissionsInput, { nullable: false })
  @Type(() => ChatUpdateWithoutUserPermissionsInput)
  data!: ChatUpdateWithoutUserPermissionsInput;
}
