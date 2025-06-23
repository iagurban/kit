import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class UserInTaskTagUncheckedUpdateManyWithoutRoleInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  userInTaskId?: StringFieldUpdateOperationsInput;
}
