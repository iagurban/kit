import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UserInTaskOrderByRelationAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  _count?: `${SortOrder}`;
}
