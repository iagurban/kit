import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UserUpdateOneRequiredWithoutChatsMmbershipNestedInput } from '../user/user-update-one-required-without-chats-mmbership-nested.input';

@InputType()
export class ChatMemberUpdateWithoutChatInput {
  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  joinedAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutChatsMmbershipNestedInput, { nullable: true })
  user?: UserUpdateOneRequiredWithoutChatsMmbershipNestedInput;
}
