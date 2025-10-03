import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UploadSessionSumOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  totalChunks?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  totalFailureCount?: `${SortOrder}`;
}
