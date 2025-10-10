import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatRoleCreateManyInput } from './chat-role-create-many.input';

@ArgsType()
export class CreateManyChatRoleArgs {
  @Field(() => [ChatRoleCreateManyInput], { nullable: false })
  @Type(() => ChatRoleCreateManyInput)
  data!: Array<ChatRoleCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
