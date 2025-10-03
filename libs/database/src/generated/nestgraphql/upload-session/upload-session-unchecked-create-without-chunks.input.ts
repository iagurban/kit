import { Field, InputType, Int } from '@nestjs/graphql';

import { UploadStatus } from '../prisma/upload-status.enum';

@InputType()
export class UploadSessionUncheckedCreateWithoutChunksInput {
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
}
