import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ProjectOrderByWithRelationInput } from '../project/project-order-by-with-relation.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { UserInProjectOrderByRelevanceInput } from './user-in-project-order-by-relevance.input';

@InputType()
export class UserInProjectOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  userId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  projectId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  permission?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  kind?: `${SortOrder}`;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  user?: UserOrderByWithRelationInput;

  @Field(() => ProjectOrderByWithRelationInput, { nullable: true })
  project?: ProjectOrderByWithRelationInput;

  @Field(() => UserInProjectOrderByRelevanceInput, { nullable: true })
  _relevance?: UserInProjectOrderByRelevanceInput;
}
