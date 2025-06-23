import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumPermissionInProjectFilter } from './nested-enum-permission-in-project-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { PermissionInProject } from './permission-in-project.enum';

@InputType()
export class NestedEnumPermissionInProjectWithAggregatesFilter {
  @Field(() => PermissionInProject, { nullable: true })
  equals?: `${PermissionInProject}`;

  @Field(() => [PermissionInProject], { nullable: true })
  in?: Array<`${PermissionInProject}`>;

  @Field(() => [PermissionInProject], { nullable: true })
  notIn?: Array<`${PermissionInProject}`>;

  @Field(() => NestedEnumPermissionInProjectWithAggregatesFilter, { nullable: true })
  not?: NestedEnumPermissionInProjectWithAggregatesFilter;

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter;

  @Field(() => NestedEnumPermissionInProjectFilter, { nullable: true })
  _min?: NestedEnumPermissionInProjectFilter;

  @Field(() => NestedEnumPermissionInProjectFilter, { nullable: true })
  _max?: NestedEnumPermissionInProjectFilter;
}
