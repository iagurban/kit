import { Field, InputType } from '@nestjs/graphql';

import { NestedBoolFilter } from './nested-bool-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';

@InputType()
export class NestedBoolWithAggregatesFilter {
  @Field(() => Boolean, { nullable: true })
  equals?: boolean;

  @Field(() => NestedBoolWithAggregatesFilter, { nullable: true })
  not?: NestedBoolWithAggregatesFilter;

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter;

  @Field(() => NestedBoolFilter, { nullable: true })
  _min?: NestedBoolFilter;

  @Field(() => NestedBoolFilter, { nullable: true })
  _max?: NestedBoolFilter;
}
