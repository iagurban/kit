import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumPermissionKindFilter } from './nested-enum-permission-kind-filter.input';
import { PermissionKind } from './permission-kind.enum';

@InputType()
export class EnumPermissionKindFilter {
  @Field(() => PermissionKind, { nullable: true })
  equals?: `${PermissionKind}`;

  @Field(() => [PermissionKind], { nullable: true })
  in?: Array<`${PermissionKind}`>;

  @Field(() => [PermissionKind], { nullable: true })
  notIn?: Array<`${PermissionKind}`>;

  @Field(() => NestedEnumPermissionKindFilter, { nullable: true })
  not?: NestedEnumPermissionKindFilter;
}
