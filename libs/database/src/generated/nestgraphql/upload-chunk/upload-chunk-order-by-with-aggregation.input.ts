import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UploadChunkAvgOrderByAggregateInput } from './upload-chunk-avg-order-by-aggregate.input';
import { UploadChunkCountOrderByAggregateInput } from './upload-chunk-count-order-by-aggregate.input';
import { UploadChunkMaxOrderByAggregateInput } from './upload-chunk-max-order-by-aggregate.input';
import { UploadChunkMinOrderByAggregateInput } from './upload-chunk-min-order-by-aggregate.input';
import { UploadChunkSumOrderByAggregateInput } from './upload-chunk-sum-order-by-aggregate.input';

@InputType()
export class UploadChunkOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  sessionId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  partNumber?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  eTag?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  leasedAt?: SortOrderInput;

  @Field(() => UploadChunkCountOrderByAggregateInput, { nullable: true })
  _count?: UploadChunkCountOrderByAggregateInput;

  @Field(() => UploadChunkAvgOrderByAggregateInput, { nullable: true })
  _avg?: UploadChunkAvgOrderByAggregateInput;

  @Field(() => UploadChunkMaxOrderByAggregateInput, { nullable: true })
  _max?: UploadChunkMaxOrderByAggregateInput;

  @Field(() => UploadChunkMinOrderByAggregateInput, { nullable: true })
  _min?: UploadChunkMinOrderByAggregateInput;

  @Field(() => UploadChunkSumOrderByAggregateInput, { nullable: true })
  _sum?: UploadChunkSumOrderByAggregateInput;
}
