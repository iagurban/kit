import { Field, InputType } from '@nestjs/graphql';

import { UploadStatus } from './upload-status.enum';

@InputType()
export class NestedEnumUploadStatusFilter {
  @Field(() => UploadStatus, { nullable: true })
  equals?: `${UploadStatus}`;

  @Field(() => [UploadStatus], { nullable: true })
  in?: Array<`${UploadStatus}`>;

  @Field(() => [UploadStatus], { nullable: true })
  notIn?: Array<`${UploadStatus}`>;

  @Field(() => NestedEnumUploadStatusFilter, { nullable: true })
  not?: NestedEnumUploadStatusFilter;
}
