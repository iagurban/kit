import { Field, InputType } from '@nestjs/graphql';

import { CreatedAtFixReason } from './created-at-fix-reason.enum';

@InputType()
export class NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput {
  @Field(() => CreatedAtFixReason, { nullable: true })
  set?: `${CreatedAtFixReason}`;
}
