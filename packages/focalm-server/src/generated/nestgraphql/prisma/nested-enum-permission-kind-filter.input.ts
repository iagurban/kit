import { Field, InputType } from '@nestjs/graphql';

import { PermissionKind } from './permission-kind.enum';

@InputType()
export class NestedEnumPermissionKindFilter {
  @Field(() => PermissionKind, { nullable: true })
  equals?: `${PermissionKind}`;

  @Field(() => [PermissionKind], { nullable: true })
  in?: Array<`${PermissionKind}`>;

  @Field(() => [PermissionKind], { nullable: true })
  notIn?: Array<`${PermissionKind}`>;

  @Field(() => NestedEnumPermissionKindFilter, { nullable: true })
  not?: NestedEnumPermissionKindFilter;
}
