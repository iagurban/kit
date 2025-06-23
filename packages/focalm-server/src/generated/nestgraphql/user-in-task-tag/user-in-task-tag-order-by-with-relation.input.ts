import { Field, InputType } from '@nestjs/graphql';

import { ParticipantRoleOrderByWithRelationInput } from '../participant-role/participant-role-order-by-with-relation.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserInTaskOrderByWithRelationInput } from '../user-in-task/user-in-task-order-by-with-relation.input';
import { UserInTaskTagOrderByRelevanceInput } from './user-in-task-tag-order-by-relevance.input';

@InputType()
export class UserInTaskTagOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  userInTaskId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  roleId?: `${SortOrder}`;

  @Field(() => UserInTaskOrderByWithRelationInput, { nullable: true })
  userInTask?: UserInTaskOrderByWithRelationInput;

  @Field(() => ParticipantRoleOrderByWithRelationInput, { nullable: true })
  role?: ParticipantRoleOrderByWithRelationInput;

  @Field(() => UserInTaskTagOrderByRelevanceInput, { nullable: true })
  _relevance?: UserInTaskTagOrderByRelevanceInput;
}
