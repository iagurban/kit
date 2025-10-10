import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatMemberScalarWhereInput } from './chat-member-scalar-where.input';
import { ChatMemberUpdateManyMutationInput } from './chat-member-update-many-mutation.input';

@InputType()
export class ChatMemberUpdateManyWithWhereWithoutUserInput {
  @Field(() => ChatMemberScalarWhereInput, { nullable: false })
  @Type(() => ChatMemberScalarWhereInput)
  where!: ChatMemberScalarWhereInput;

  @Field(() => ChatMemberUpdateManyMutationInput, { nullable: false })
  @Type(() => ChatMemberUpdateManyMutationInput)
  data!: ChatMemberUpdateManyMutationInput;
}
