import { Field, InputType } from '@nestjs/graphql';

import { PermissionKind } from './permission-kind.enum';

@InputType()
export class EnumPermissionKindFieldUpdateOperationsInput {
  @Field(() => PermissionKind, { nullable: true })
  set?: `${PermissionKind}`;
}
