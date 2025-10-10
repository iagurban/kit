import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatCreateManyDefaultRoleInput } from './chat-create-many-default-role.input';

@InputType()
export class ChatCreateManyDefaultRoleInputEnvelope {
  @Field(() => [ChatCreateManyDefaultRoleInput], { nullable: false })
  @Type(() => ChatCreateManyDefaultRoleInput)
  data!: Array<ChatCreateManyDefaultRoleInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
