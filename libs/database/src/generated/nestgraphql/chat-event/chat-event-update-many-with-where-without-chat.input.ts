import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventScalarWhereInput } from './chat-event-scalar-where.input';
import { ChatEventUpdateManyMutationInput } from './chat-event-update-many-mutation.input';

@InputType()
export class ChatEventUpdateManyWithWhereWithoutChatInput {
  @Field(() => ChatEventScalarWhereInput, { nullable: false })
  @Type(() => ChatEventScalarWhereInput)
  where!: ChatEventScalarWhereInput;

  @Field(() => ChatEventUpdateManyMutationInput, { nullable: false })
  @Type(() => ChatEventUpdateManyMutationInput)
  data!: ChatEventUpdateManyMutationInput;
}
