import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumUploadStatusFilter } from './nested-enum-upload-status-filter.input';
import { UploadStatus } from './upload-status.enum';

@InputType()
export class EnumUploadStatusFilter {
  @Field(() => UploadStatus, { nullable: true })
  equals?: `${UploadStatus}`;

  @Field(() => [UploadStatus], { nullable: true })
  in?: Array<`${UploadStatus}`>;

  @Field(() => [UploadStatus], { nullable: true })
  notIn?: Array<`${UploadStatus}`>;

  @Field(() => NestedEnumUploadStatusFilter, { nullable: true })
  not?: NestedEnumUploadStatusFilter;
}
