import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UploadChunkOrderByRelationAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  _count?: `${SortOrder}`;
}
