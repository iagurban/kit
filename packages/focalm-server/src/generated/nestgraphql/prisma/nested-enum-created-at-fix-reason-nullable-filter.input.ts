import { Field, InputType } from '@nestjs/graphql';

import { CreatedAtFixReason } from './created-at-fix-reason.enum';

@InputType()
export class NestedEnumCreatedAtFixReasonNullableFilter {
  @Field(() => CreatedAtFixReason, { nullable: true })
  equals?: `${CreatedAtFixReason}`;

  @Field(() => [CreatedAtFixReason], { nullable: true })
  in?: Array<`${CreatedAtFixReason}`>;

  @Field(() => [CreatedAtFixReason], { nullable: true })
  notIn?: Array<`${CreatedAtFixReason}`>;

  @Field(() => NestedEnumCreatedAtFixReasonNullableFilter, { nullable: true })
  not?: NestedEnumCreatedAtFixReasonNullableFilter;
}
