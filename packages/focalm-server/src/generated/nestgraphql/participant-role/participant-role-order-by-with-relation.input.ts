import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UserInTaskTagOrderByRelationAggregateInput } from '../user-in-task-tag/user-in-task-tag-order-by-relation-aggregate.input';
import { ParticipantRoleOrderByRelevanceInput } from './participant-role-order-by-relevance.input';

@InputType()
export class ParticipantRoleOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  name?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  color?: `${SortOrder}`;

  @Field(() => UserInTaskTagOrderByRelationAggregateInput, { nullable: true })
  usersInTasks?: UserInTaskTagOrderByRelationAggregateInput;

  @Field(() => ParticipantRoleOrderByRelevanceInput, { nullable: true })
  _relevance?: ParticipantRoleOrderByRelevanceInput;
}
