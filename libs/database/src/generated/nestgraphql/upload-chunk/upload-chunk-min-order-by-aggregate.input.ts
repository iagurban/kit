import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UploadChunkMinOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  sessionId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  partNumber?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  eTag?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  leasedAt?: `${SortOrder}`;
}
