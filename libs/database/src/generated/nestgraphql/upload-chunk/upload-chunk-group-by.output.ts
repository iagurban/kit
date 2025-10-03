import { Field, Int, ObjectType } from '@nestjs/graphql';

import { UploadChunkAvgAggregate } from './upload-chunk-avg-aggregate.output';
import { UploadChunkCountAggregate } from './upload-chunk-count-aggregate.output';
import { UploadChunkMaxAggregate } from './upload-chunk-max-aggregate.output';
import { UploadChunkMinAggregate } from './upload-chunk-min-aggregate.output';
import { UploadChunkSumAggregate } from './upload-chunk-sum-aggregate.output';

@ObjectType()
export class UploadChunkGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  sessionId!: string;

  @Field(() => Int, { nullable: false })
  partNumber!: number;

  @Field(() => String, { nullable: true })
  eTag?: string;

  @Field(() => Date, { nullable: true })
  leasedAt?: Date | string;

  @Field(() => UploadChunkCountAggregate, { nullable: true })
  _count?: UploadChunkCountAggregate;

  @Field(() => UploadChunkAvgAggregate, { nullable: true })
  _avg?: UploadChunkAvgAggregate;

  @Field(() => UploadChunkSumAggregate, { nullable: true })
  _sum?: UploadChunkSumAggregate;

  @Field(() => UploadChunkMinAggregate, { nullable: true })
  _min?: UploadChunkMinAggregate;

  @Field(() => UploadChunkMaxAggregate, { nullable: true })
  _max?: UploadChunkMaxAggregate;
}
