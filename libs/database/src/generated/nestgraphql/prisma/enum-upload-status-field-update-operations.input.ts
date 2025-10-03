import { Field, InputType } from '@nestjs/graphql';

import { UploadStatus } from './upload-status.enum';

@InputType()
export class EnumUploadStatusFieldUpdateOperationsInput {
  @Field(() => UploadStatus, { nullable: true })
  set?: `${UploadStatus}`;
}
