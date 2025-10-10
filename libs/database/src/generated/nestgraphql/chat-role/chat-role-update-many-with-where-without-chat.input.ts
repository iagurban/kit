import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatRoleScalarWhereInput } from './chat-role-scalar-where.input';
import { ChatRoleUpdateManyMutationInput } from './chat-role-update-many-mutation.input';

@InputType()
export class ChatRoleUpdateManyWithWhereWithoutChatInput {
  @Field(() => ChatRoleScalarWhereInput, { nullable: false })
  @Type(() => ChatRoleScalarWhereInput)
  where!: ChatRoleScalarWhereInput;

  @Field(() => ChatRoleUpdateManyMutationInput, { nullable: false })
  @Type(() => ChatRoleUpdateManyMutationInput)
  data!: ChatRoleUpdateManyMutationInput;
}
