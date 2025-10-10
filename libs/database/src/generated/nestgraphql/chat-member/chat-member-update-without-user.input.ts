import { Field, InputType } from '@nestjs/graphql';

import { ChatUpdateOneRequiredWithoutMembersNestedInput } from '../chat/chat-update-one-required-without-members-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';

@InputType()
export class ChatMemberUpdateWithoutUserInput {
  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  joinedAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => ChatUpdateOneRequiredWithoutMembersNestedInput, { nullable: true })
  chat?: ChatUpdateOneRequiredWithoutMembersNestedInput;
}
