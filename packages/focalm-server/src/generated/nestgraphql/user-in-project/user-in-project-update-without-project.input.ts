import { Field, InputType } from '@nestjs/graphql';

import { EnumPermissionInProjectFieldUpdateOperationsInput } from '../prisma/enum-permission-in-project-field-update-operations.input';
import { EnumPermissionKindFieldUpdateOperationsInput } from '../prisma/enum-permission-kind-field-update-operations.input';
import { UserUpdateOneRequiredWithoutInProjectsNestedInput } from '../user/user-update-one-required-without-in-projects-nested.input';

@InputType()
export class UserInProjectUpdateWithoutProjectInput {
  @Field(() => EnumPermissionInProjectFieldUpdateOperationsInput, { nullable: true })
  permission?: EnumPermissionInProjectFieldUpdateOperationsInput;

  @Field(() => EnumPermissionKindFieldUpdateOperationsInput, { nullable: true })
  kind?: EnumPermissionKindFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutInProjectsNestedInput, { nullable: true })
  user?: UserUpdateOneRequiredWithoutInProjectsNestedInput;
}
