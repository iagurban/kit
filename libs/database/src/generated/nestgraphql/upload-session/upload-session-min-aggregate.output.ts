import { Field, Int, ObjectType } from '@nestjs/graphql';

import { UploadStatus } from '../prisma/upload-status.enum';

@ObjectType()
export class UploadSessionMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  storageUploadId?: string;

  @Field(() => String, { nullable: true })
  fileId?: string;

  @Field(() => Int, { nullable: true })
  totalChunks?: number;

  @Field(() => UploadStatus, { nullable: true })
  status?: `${UploadStatus}`;

  @Field(() => String, { nullable: true })
  failReason?: string;

  @Field(() => Int, { nullable: true })
  totalFailureCount?: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;
}
