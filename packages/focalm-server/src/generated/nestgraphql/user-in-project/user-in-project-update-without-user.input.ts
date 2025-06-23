import { Field, InputType } from '@nestjs/graphql';

import { EnumPermissionInProjectFieldUpdateOperationsInput } from '../prisma/enum-permission-in-project-field-update-operations.input';
import { EnumPermissionKindFieldUpdateOperationsInput } from '../prisma/enum-permission-kind-field-update-operations.input';
import { ProjectUpdateOneRequiredWithoutUsersPermissionsNestedInput } from '../project/project-update-one-required-without-users-permissions-nested.input';

@InputType()
export class UserInProjectUpdateWithoutUserInput {
  @Field(() => EnumPermissionInProjectFieldUpdateOperationsInput, { nullable: true })
  permission?: EnumPermissionInProjectFieldUpdateOperationsInput;

  @Field(() => EnumPermissionKindFieldUpdateOperationsInput, { nullable: true })
  kind?: EnumPermissionKindFieldUpdateOperationsInput;

  @Field(() => ProjectUpdateOneRequiredWithoutUsersPermissionsNestedInput, { nullable: true })
  project?: ProjectUpdateOneRequiredWithoutUsersPermissionsNestedInput;
}
