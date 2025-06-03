import { Field, InputType } from '@nestjs/graphql';

import { NestedUuidNullableFilter } from './nested-uuid-nullable-filter.input';
import { QueryMode } from './query-mode.enum';

@InputType()
export class UuidNullableFilter {
  @Field(() => String, { nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: Array<string>;

  @Field(() => [String], { nullable: true })
  notIn?: Array<string>;

  @Field(() => String, { nullable: true })
  lt?: string;

  @Field(() => String, { nullable: true })
  lte?: string;

  @Field(() => String, { nullable: true })
  gt?: string;

  @Field(() => String, { nullable: true })
  gte?: string;

  @Field(() => QueryMode, { nullable: true })
  mode?: `${QueryMode}`;

  @Field(() => NestedUuidNullableFilter, { nullable: true })
  not?: NestedUuidNullableFilter;
}
