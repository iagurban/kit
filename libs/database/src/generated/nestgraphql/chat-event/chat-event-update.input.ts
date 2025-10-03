import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatUpdateOneRequiredWithoutEventsNestedInput } from '../chat/chat-update-one-required-without-events-nested.input';
import { BigIntFieldUpdateOperationsInput } from '../prisma/big-int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserUpdateOneRequiredWithoutChatEventsNestedInput } from '../user/user-update-one-required-without-chat-events-nested.input';

@InputType()
export class ChatEventUpdateInput {
  @Field(() => BigIntFieldUpdateOperationsInput, { nullable: true })
  id?: BigIntFieldUpdateOperationsInput;

  @Field(() => BigIntFieldUpdateOperationsInput, { nullable: true })
  nn?: BigIntFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  type?: StringFieldUpdateOperationsInput;

  @Field(() => GraphQLJSON, { nullable: true })
  payload?: any;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => ChatUpdateOneRequiredWithoutEventsNestedInput, { nullable: true })
  chat?: ChatUpdateOneRequiredWithoutEventsNestedInput;

  @Field(() => UserUpdateOneRequiredWithoutChatEventsNestedInput, { nullable: true })
  author?: UserUpdateOneRequiredWithoutChatEventsNestedInput;
}
