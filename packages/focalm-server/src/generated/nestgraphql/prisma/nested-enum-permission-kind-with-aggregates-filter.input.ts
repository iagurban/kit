import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumPermissionKindFilter } from './nested-enum-permission-kind-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { PermissionKind } from './permission-kind.enum';

@InputType()
export class NestedEnumPermissionKindWithAggregatesFilter {
  @Field(() => PermissionKind, { nullable: true })
  equals?: `${PermissionKind}`;

  @Field(() => [PermissionKind], { nullable: true })
  in?: Array<`${PermissionKind}`>;

  @Field(() => [PermissionKind], { nullable: true })
  notIn?: Array<`${PermissionKind}`>;

  @Field(() => NestedEnumPermissionKindWithAggregatesFilter, { nullable: true })
  not?: NestedEnumPermissionKindWithAggregatesFilter;

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter;

  @Field(() => NestedEnumPermissionKindFilter, { nullable: true })
  _min?: NestedEnumPermissionKindFilter;

  @Field(() => NestedEnumPermissionKindFilter, { nullable: true })
  _max?: NestedEnumPermissionKindFilter;
}
