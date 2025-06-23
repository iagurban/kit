import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ProjectSumOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  tasksCounter?: `${SortOrder}`;
}
