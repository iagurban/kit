import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatScalarWhereInput } from './chat-scalar-where.input';
import { ChatUpdateManyMutationInput } from './chat-update-many-mutation.input';

@InputType()
export class ChatUpdateManyWithWhereWithoutOwnerInput {
  @Field(() => ChatScalarWhereInput, { nullable: false })
  @Type(() => ChatScalarWhereInput)
  where!: ChatScalarWhereInput;

  @Field(() => ChatUpdateManyMutationInput, { nullable: false })
  @Type(() => ChatUpdateManyMutationInput)
  data!: ChatUpdateManyMutationInput;
}
