import { Field, InputType, Int } from '@nestjs/graphql';

import { UploadStatus } from '../prisma/upload-status.enum';
import { UploadChunkCreateNestedManyWithoutSessionInput } from '../upload-chunk/upload-chunk-create-nested-many-without-session.input';

@InputType()
export class UploadSessionCreateWithoutFileInput {
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

  @Field(() => UploadChunkCreateNestedManyWithoutSessionInput, { nullable: true })
  chunks?: UploadChunkCreateNestedManyWithoutSessionInput;
}
