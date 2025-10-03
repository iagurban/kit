import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UploadSessionMinOrderByAggregateInput {
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

  @Field(() => SortOrder, { nullable: true })
  failReason?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  totalFailureCount?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;
}
