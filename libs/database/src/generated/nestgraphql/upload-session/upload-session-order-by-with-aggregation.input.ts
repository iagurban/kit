import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UploadSessionAvgOrderByAggregateInput } from './upload-session-avg-order-by-aggregate.input';
import { UploadSessionCountOrderByAggregateInput } from './upload-session-count-order-by-aggregate.input';
import { UploadSessionMaxOrderByAggregateInput } from './upload-session-max-order-by-aggregate.input';
import { UploadSessionMinOrderByAggregateInput } from './upload-session-min-order-by-aggregate.input';
import { UploadSessionSumOrderByAggregateInput } from './upload-session-sum-order-by-aggregate.input';

@InputType()
export class UploadSessionOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  storageUploadId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  fileId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  totalChunks?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  status?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  failReason?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  totalFailureCount?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => UploadSessionCountOrderByAggregateInput, { nullable: true })
  _count?: UploadSessionCountOrderByAggregateInput;

  @Field(() => UploadSessionAvgOrderByAggregateInput, { nullable: true })
  _avg?: UploadSessionAvgOrderByAggregateInput;

  @Field(() => UploadSessionMaxOrderByAggregateInput, { nullable: true })
  _max?: UploadSessionMaxOrderByAggregateInput;

  @Field(() => UploadSessionMinOrderByAggregateInput, { nullable: true })
  _min?: UploadSessionMinOrderByAggregateInput;

  @Field(() => UploadSessionSumOrderByAggregateInput, { nullable: true })
  _sum?: UploadSessionSumOrderByAggregateInput;
}
