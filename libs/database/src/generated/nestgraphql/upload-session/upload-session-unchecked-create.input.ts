import { Field, InputType, Int } from '@nestjs/graphql';

import { UploadStatus } from '../prisma/upload-status.enum';
import { UploadChunkUncheckedCreateNestedManyWithoutSessionInput } from '../upload-chunk/upload-chunk-unchecked-create-nested-many-without-session.input';

@InputType()
export class UploadSessionUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  storageUploadId!: string;

  @Field(() => String, { nullable: false })
  fileId!: string;

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

  @Field(() => UploadChunkUncheckedCreateNestedManyWithoutSessionInput, { nullable: true })
  chunks?: UploadChunkUncheckedCreateNestedManyWithoutSessionInput;
}
