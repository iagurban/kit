import { Field, InputType } from '@nestjs/graphql';

import { PermissionInProject } from './permission-in-project.enum';

@InputType()
export class EnumPermissionInProjectFieldUpdateOperationsInput {
  @Field(() => PermissionInProject, { nullable: true })
  set?: `${PermissionInProject}`;
}
