import { Field, InputType } from '@nestjs/graphql';

import { CreatedAtFixReason } from './created-at-fix-reason.enum';
import { NestedEnumCreatedAtFixReasonNullableFilter } from './nested-enum-created-at-fix-reason-nullable-filter.input';
import { NestedEnumCreatedAtFixReasonNullableWithAggregatesFilter } from './nested-enum-created-at-fix-reason-nullable-with-aggregates-filter.input';
import { NestedIntNullableFilter } from './nested-int-nullable-filter.input';

@InputType()
export class EnumCreatedAtFixReasonNullableWithAggregatesFilter {
  @Field(() => CreatedAtFixReason, { nullable: true })
  equals?: `${CreatedAtFixReason}`;

  @Field(() => [CreatedAtFixReason], { nullable: true })
  in?: Array<`${CreatedAtFixReason}`>;

  @Field(() => [CreatedAtFixReason], { nullable: true })
  notIn?: Array<`${CreatedAtFixReason}`>;

  @Field(() => NestedEnumCreatedAtFixReasonNullableWithAggregatesFilter, { nullable: true })
  not?: NestedEnumCreatedAtFixReasonNullableWithAggregatesFilter;

  @Field(() => NestedIntNullableFilter, { nullable: true })
  _count?: NestedIntNullableFilter;

  @Field(() => NestedEnumCreatedAtFixReasonNullableFilter, { nullable: true })
  _min?: NestedEnumCreatedAtFixReasonNullableFilter;

  @Field(() => NestedEnumCreatedAtFixReasonNullableFilter, { nullable: true })
  _max?: NestedEnumCreatedAtFixReasonNullableFilter;
}
