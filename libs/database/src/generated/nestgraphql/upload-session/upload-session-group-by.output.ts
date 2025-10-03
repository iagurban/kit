import { Field, Int, ObjectType } from '@nestjs/graphql';

import { UploadStatus } from '../prisma/upload-status.enum';
import { UploadSessionAvgAggregate } from './upload-session-avg-aggregate.output';
import { UploadSessionCountAggregate } from './upload-session-count-aggregate.output';
import { UploadSessionMaxAggregate } from './upload-session-max-aggregate.output';
import { UploadSessionMinAggregate } from './upload-session-min-aggregate.output';
import { UploadSessionSumAggregate } from './upload-session-sum-aggregate.output';

@ObjectType()
export class UploadSessionGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  storageUploadId!: string;

  @Field(() => String, { nullable: false })
  fileId!: string;

  @Field(() => Int, { nullable: false })
  totalChunks!: number;

  @Field(() => UploadStatus, { nullable: false })
  status!: `${UploadStatus}`;

  @Field(() => String, { nullable: true })
  failReason?: string;

  @Field(() => Int, { nullable: false })
  totalFailureCount!: number;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => UploadSessionCountAggregate, { nullable: true })
  _count?: UploadSessionCountAggregate;

  @Field(() => UploadSessionAvgAggregate, { nullable: true })
  _avg?: UploadSessionAvgAggregate;

  @Field(() => UploadSessionSumAggregate, { nullable: true })
  _sum?: UploadSessionSumAggregate;

  @Field(() => UploadSessionMinAggregate, { nullable: true })
  _min?: UploadSessionMinAggregate;

  @Field(() => UploadSessionMaxAggregate, { nullable: true })
  _max?: UploadSessionMaxAggregate;
}
