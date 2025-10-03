import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UploadChunkAvgOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  partNumber?: `${SortOrder}`;
}
