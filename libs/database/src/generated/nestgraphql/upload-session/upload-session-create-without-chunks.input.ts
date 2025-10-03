import { Field, InputType, Int } from '@nestjs/graphql';

import { UploadStatus } from '../prisma/upload-status.enum';
import { StoredFileCreateNestedOneWithoutUploadSessionInput } from '../stored-file/stored-file-create-nested-one-without-upload-session.input';

@InputType()
export class UploadSessionCreateWithoutChunksInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  storageUploadId!: string;

  @Field(() => Int, { nullable: false })
  totalChunks!: number;

  @Field(() => UploadStatus, { nullable: true })
  status?: `${UploadStatus}`;

  @Field(() => String, { nullable: true })
  failReason?: string;

  @Field(() => Int, { nullable: true })
  totalFailureCount?: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => StoredFileCreateNestedOneWithoutUploadSessionInput, { nullable: false })
  file!: StoredFileCreateNestedOneWithoutUploadSessionInput;
}
