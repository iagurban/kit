import { Field, InputType } from '@nestjs/graphql';

import { ChatUpdateOneRequiredWithoutMembersNestedInput } from '../chat/chat-update-one-required-without-members-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UserUpdateOneRequiredWithoutChatsMmbershipNestedInput } from '../user/user-update-one-required-without-chats-mmbership-nested.input';

@InputType()
export class ChatMemberUpdateInput {
  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  joinedAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutChatsMmbershipNestedInput, { nullable: true })
  user?: UserUpdateOneRequiredWithoutChatsMmbershipNestedInput;

  @Field(() => ChatUpdateOneRequiredWithoutMembersNestedInput, { nullable: true })
  chat?: ChatUpdateOneRequiredWithoutMembersNestedInput;
}
