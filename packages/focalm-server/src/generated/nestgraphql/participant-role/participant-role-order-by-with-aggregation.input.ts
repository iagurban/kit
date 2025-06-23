import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ParticipantRoleCountOrderByAggregateInput } from './participant-role-count-order-by-aggregate.input';
import { ParticipantRoleMaxOrderByAggregateInput } from './participant-role-max-order-by-aggregate.input';
import { ParticipantRoleMinOrderByAggregateInput } from './participant-role-min-order-by-aggregate.input';

@InputType()
export class ParticipantRoleOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  name?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  color?: `${SortOrder}`;

  @Field(() => ParticipantRoleCountOrderByAggregateInput, { nullable: true })
  _count?: ParticipantRoleCountOrderByAggregateInput;

  @Field(() => ParticipantRoleMaxOrderByAggregateInput, { nullable: true })
  _max?: ParticipantRoleMaxOrderByAggregateInput;

  @Field(() => ParticipantRoleMinOrderByAggregateInput, { nullable: true })
  _min?: ParticipantRoleMinOrderByAggregateInput;
}
