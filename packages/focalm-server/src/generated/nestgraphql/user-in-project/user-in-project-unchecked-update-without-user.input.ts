import { Field, InputType } from '@nestjs/graphql';

import { EnumPermissionInProjectFieldUpdateOperationsInput } from '../prisma/enum-permission-in-project-field-update-operations.input';
import { EnumPermissionKindFieldUpdateOperationsInput } from '../prisma/enum-permission-kind-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class UserInProjectUncheckedUpdateWithoutUserInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  projectId?: StringFieldUpdateOperationsInput;

  @Field(() => EnumPermissionInProjectFieldUpdateOperationsInput, { nullable: true })
  permission?: EnumPermissionInProjectFieldUpdateOperationsInput;

  @Field(() => EnumPermissionKindFieldUpdateOperationsInput, { nullable: true })
  kind?: EnumPermissionKindFieldUpdateOperationsInput;
}
