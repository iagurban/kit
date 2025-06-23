import { Field, InputType } from '@nestjs/graphql';

import { EnumPermissionInProjectFieldUpdateOperationsInput } from '../prisma/enum-permission-in-project-field-update-operations.input';
import { EnumPermissionKindFieldUpdateOperationsInput } from '../prisma/enum-permission-kind-field-update-operations.input';
import { ProjectUpdateOneRequiredWithoutUsersPermissionsNestedInput } from '../project/project-update-one-required-without-users-permissions-nested.input';
import { UserUpdateOneRequiredWithoutInProjectsNestedInput } from '../user/user-update-one-required-without-in-projects-nested.input';

@InputType()
export class UserInProjectUpdateInput {
  @Field(() => EnumPermissionInProjectFieldUpdateOperationsInput, { nullable: true })
  permission?: EnumPermissionInProjectFieldUpdateOperationsInput;

  @Field(() => EnumPermissionKindFieldUpdateOperationsInput, { nullable: true })
  kind?: EnumPermissionKindFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutInProjectsNestedInput, { nullable: true })
  user?: UserUpdateOneRequiredWithoutInProjectsNestedInput;

  @Field(() => ProjectUpdateOneRequiredWithoutUsersPermissionsNestedInput, { nullable: true })
  project?: ProjectUpdateOneRequiredWithoutUsersPermissionsNestedInput;
}
