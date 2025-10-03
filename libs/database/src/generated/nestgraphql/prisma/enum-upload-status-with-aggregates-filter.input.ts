import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumUploadStatusFilter } from './nested-enum-upload-status-filter.input';
import { NestedEnumUploadStatusWithAggregatesFilter } from './nested-enum-upload-status-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { UploadStatus } from './upload-status.enum';

@InputType()
export class EnumUploadStatusWithAggregatesFilter {
  @Field(() => UploadStatus, { nullable: true })
  equals?: `${UploadStatus}`;

  @Field(() => [UploadStatus], { nullable: true })
  in?: Array<`${UploadStatus}`>;

  @Field(() => [UploadStatus], { nullable: true })
  notIn?: Array<`${UploadStatus}`>;

  @Field(() => NestedEnumUploadStatusWithAggregatesFilter, { nullable: true })
  not?: NestedEnumUploadStatusWithAggregatesFilter;

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter;

  @Field(() => NestedEnumUploadStatusFilter, { nullable: true })
  _min?: NestedEnumUploadStatusFilter;

  @Field(() => NestedEnumUploadStatusFilter, { nullable: true })
  _max?: NestedEnumUploadStatusFilter;
}
