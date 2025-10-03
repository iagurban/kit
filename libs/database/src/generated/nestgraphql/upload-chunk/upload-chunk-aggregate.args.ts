import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadChunkAvgAggregateInput } from './upload-chunk-avg-aggregate.input';
import { UploadChunkCountAggregateInput } from './upload-chunk-count-aggregate.input';
import { UploadChunkMaxAggregateInput } from './upload-chunk-max-aggregate.input';
import { UploadChunkMinAggregateInput } from './upload-chunk-min-aggregate.input';
import { UploadChunkOrderByWithRelationInput } from './upload-chunk-order-by-with-relation.input';
import { UploadChunkSumAggregateInput } from './upload-chunk-sum-aggregate.input';
import { UploadChunkWhereInput } from './upload-chunk-where.input';
import { UploadChunkWhereUniqueInput } from './upload-chunk-where-unique.input';

@ArgsType()
export class UploadChunkAggregateArgs {
  @Field(() => UploadChunkWhereInput, { nullable: true })
  @Type(() => UploadChunkWhereInput)
  where?: UploadChunkWhereInput;

  @Field(() => [UploadChunkOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UploadChunkOrderByWithRelationInput>;

  @Field(() => UploadChunkWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => UploadChunkCountAggregateInput, { nullable: true })
  _count?: UploadChunkCountAggregateInput;

  @Field(() => UploadChunkAvgAggregateInput, { nullable: true })
  _avg?: UploadChunkAvgAggregateInput;

  @Field(() => UploadChunkSumAggregateInput, { nullable: true })
  _sum?: UploadChunkSumAggregateInput;

  @Field(() => UploadChunkMinAggregateInput, { nullable: true })
  _min?: UploadChunkMinAggregateInput;

  @Field(() => UploadChunkMaxAggregateInput, { nullable: true })
  _max?: UploadChunkMaxAggregateInput;
}
