import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatUpdateWithoutRolesInput } from './chat-update-without-roles.input';
import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatUpdateToOneWithWhereWithoutRolesInput {
  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;

  @Field(() => ChatUpdateWithoutRolesInput, { nullable: false })
  @Type(() => ChatUpdateWithoutRolesInput)
  data!: ChatUpdateWithoutRolesInput;
}
