import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { UploadStatus } from '../prisma/upload-status.enum';
import { StoredFile } from '../stored-file/stored-file.model';
import { UploadChunk } from '../upload-chunk/upload-chunk.model';
import { UploadSessionCount } from './upload-session-count.output';

@ObjectType()
export class UploadSession {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  storageUploadId!: string;

  @Field(() => String, { nullable: false })
  fileId!: string;

  @Field(() => Int, { nullable: false })
  totalChunks!: number;

  @Field(() => UploadStatus, { defaultValue: 'ACTIVE', nullable: false })
  status!: `${UploadStatus}`;

  @Field(() => String, { nullable: true })
  failReason!: string | null;

  @Field(() => Int, { defaultValue: 0, nullable: false })
  totalFailureCount!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => StoredFile, { nullable: false })
  file?: StoredFile;

  @Field(() => [UploadChunk], { nullable: true })
  chunks?: Array<UploadChunk>;

  @Field(() => UploadSessionCount, { nullable: false })
  _count?: UploadSessionCount;
}
