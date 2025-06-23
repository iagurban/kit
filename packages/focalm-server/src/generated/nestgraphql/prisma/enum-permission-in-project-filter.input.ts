import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumPermissionInProjectFilter } from './nested-enum-permission-in-project-filter.input';
import { PermissionInProject } from './permission-in-project.enum';

@InputType()
export class EnumPermissionInProjectFilter {
  @Field(() => PermissionInProject, { nullable: true })
  equals?: `${PermissionInProject}`;

  @Field(() => [PermissionInProject], { nullable: true })
  in?: Array<`${PermissionInProject}`>;

  @Field(() => [PermissionInProject], { nullable: true })
  notIn?: Array<`${PermissionInProject}`>;

  @Field(() => NestedEnumPermissionInProjectFilter, { nullable: true })
  not?: NestedEnumPermissionInProjectFilter;
}
