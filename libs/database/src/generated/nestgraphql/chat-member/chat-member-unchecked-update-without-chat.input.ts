import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class ChatMemberUncheckedUpdateWithoutChatInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  userId?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  joinedAt?: DateTimeFieldUpdateOperationsInput;
}
