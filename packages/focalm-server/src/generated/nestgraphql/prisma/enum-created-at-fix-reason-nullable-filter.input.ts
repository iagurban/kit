import { Field, InputType } from '@nestjs/graphql';

import { CreatedAtFixReason } from './created-at-fix-reason.enum';
import { NestedEnumCreatedAtFixReasonNullableFilter } from './nested-enum-created-at-fix-reason-nullable-filter.input';

@InputType()
export class EnumCreatedAtFixReasonNullableFilter {
  @Field(() => CreatedAtFixReason, { nullable: true })
  equals?: `${CreatedAtFixReason}`;

  @Field(() => [CreatedAtFixReason], { nullable: true })
  in?: Array<`${CreatedAtFixReason}`>;

  @Field(() => [CreatedAtFixReason], { nullable: true })
  notIn?: Array<`${CreatedAtFixReason}`>;

  @Field(() => NestedEnumCreatedAtFixReasonNullableFilter, { nullable: true })
  not?: NestedEnumCreatedAtFixReasonNullableFilter;
}
