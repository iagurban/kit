import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserUpdateOneRequiredWithoutRefreshTokensNestedInput } from '../user/user-update-one-required-without-refresh-tokens-nested.input';

@InputType()
export class RefreshTokenUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  expiresAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  hash?: StringFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutRefreshTokensNestedInput, { nullable: true })
  user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput;
}
