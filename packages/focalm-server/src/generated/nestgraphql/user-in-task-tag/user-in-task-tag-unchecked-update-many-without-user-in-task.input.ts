import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class UserInTaskTagUncheckedUpdateManyWithoutUserInTaskInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  roleId?: StringFieldUpdateOperationsInput;
}
