import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadChunkAvgAggregateInput } from './upload-chunk-avg-aggregate.input';
import { UploadChunkCountAggregateInput } from './upload-chunk-count-aggregate.input';
import { UploadChunkMaxAggregateInput } from './upload-chunk-max-aggregate.input';
import { UploadChunkMinAggregateInput } from './upload-chunk-min-aggregate.input';
import { UploadChunkOrderByWithAggregationInput } from './upload-chunk-order-by-with-aggregation.input';
import { UploadChunkScalarFieldEnum } from './upload-chunk-scalar-field.enum';
import { UploadChunkScalarWhereWithAggregatesInput } from './upload-chunk-scalar-where-with-aggregates.input';
import { UploadChunkSumAggregateInput } from './upload-chunk-sum-aggregate.input';
import { UploadChunkWhereInput } from './upload-chunk-where.input';

@ArgsType()
export class UploadChunkGroupByArgs {
  @Field(() => UploadChunkWhereInput, { nullable: true })
  @Type(() => UploadChunkWhereInput)
  where?: UploadChunkWhereInput;

  @Field(() => [UploadChunkOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<UploadChunkOrderByWithAggregationInput>;

  @Field(() => [UploadChunkScalarFieldEnum], { nullable: false })
  by!: Array<`${UploadChunkScalarFieldEnum}`>;

  @Field(() => UploadChunkScalarWhereWithAggregatesInput, { nullable: true })
  having?: UploadChunkScalarWhereWithAggregatesInput;

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
