import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ProjectAvgOrderByAggregateInput } from './project-avg-order-by-aggregate.input';
import { ProjectCountOrderByAggregateInput } from './project-count-order-by-aggregate.input';
import { ProjectMaxOrderByAggregateInput } from './project-max-order-by-aggregate.input';
import { ProjectMinOrderByAggregateInput } from './project-min-order-by-aggregate.input';
import { ProjectSumOrderByAggregateInput } from './project-sum-order-by-aggregate.input';

@InputType()
export class ProjectOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  tasksCounter?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  name?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  abbrev?: SortOrderInput;

  @Field(() => ProjectCountOrderByAggregateInput, { nullable: true })
  _count?: ProjectCountOrderByAggregateInput;

  @Field(() => ProjectAvgOrderByAggregateInput, { nullable: true })
  _avg?: ProjectAvgOrderByAggregateInput;

  @Field(() => ProjectMaxOrderByAggregateInput, { nullable: true })
  _max?: ProjectMaxOrderByAggregateInput;

  @Field(() => ProjectMinOrderByAggregateInput, { nullable: true })
  _min?: ProjectMinOrderByAggregateInput;

  @Field(() => ProjectSumOrderByAggregateInput, { nullable: true })
  _sum?: ProjectSumOrderByAggregateInput;
}
