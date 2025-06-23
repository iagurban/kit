import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ProjectOrderByWithRelationInput } from '../project/project-order-by-with-relation.input';
import { RefreshTokenOrderByRelationAggregateInput } from '../refresh-token/refresh-token-order-by-relation-aggregate.input';
import { TaskOrderByRelationAggregateInput } from '../task/task-order-by-relation-aggregate.input';
import { TaskHistoryGroupOrderByRelationAggregateInput } from '../task-history-group/task-history-group-order-by-relation-aggregate.input';
import { UploadedFileOrderByRelationAggregateInput } from '../uploaded-file/uploaded-file-order-by-relation-aggregate.input';
import { UserInProjectOrderByRelationAggregateInput } from '../user-in-project/user-in-project-order-by-relation-aggregate.input';
import { UserInTaskOrderByRelationAggregateInput } from '../user-in-task/user-in-task-order-by-relation-aggregate.input';
import { UserOrderByRelevanceInput } from './user-order-by-relevance.input';

@InputType()
export class UserOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  email?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  name?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  abbrev?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  passwordHash?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  ownProjectId?: `${SortOrder}`;

  @Field(() => UploadedFileOrderByRelationAggregateInput, { nullable: true })
  uploadedFiles?: UploadedFileOrderByRelationAggregateInput;

  @Field(() => RefreshTokenOrderByRelationAggregateInput, { nullable: true })
  refreshTokens?: RefreshTokenOrderByRelationAggregateInput;

  @Field(() => TaskOrderByRelationAggregateInput, { nullable: true })
  assignedTasks?: TaskOrderByRelationAggregateInput;

  @Field(() => TaskOrderByRelationAggregateInput, { nullable: true })
  authoredTasks?: TaskOrderByRelationAggregateInput;

  @Field(() => TaskHistoryGroupOrderByRelationAggregateInput, { nullable: true })
  authoredTaskChanges?: TaskHistoryGroupOrderByRelationAggregateInput;

  @Field(() => UserInTaskOrderByRelationAggregateInput, { nullable: true })
  participatingTasks?: UserInTaskOrderByRelationAggregateInput;

  @Field(() => ProjectOrderByWithRelationInput, { nullable: true })
  ownProject?: ProjectOrderByWithRelationInput;

  @Field(() => UserInProjectOrderByRelationAggregateInput, { nullable: true })
  inProjects?: UserInProjectOrderByRelationAggregateInput;

  @Field(() => UserOrderByRelevanceInput, { nullable: true })
  _relevance?: UserOrderByRelevanceInput;
}
