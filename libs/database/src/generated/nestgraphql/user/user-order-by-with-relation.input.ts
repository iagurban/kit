import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { RefreshTokenOrderByRelationAggregateInput } from '../refresh-token/refresh-token-order-by-relation-aggregate.input';
import { UploadedFileOrderByRelationAggregateInput } from '../uploaded-file/uploaded-file-order-by-relation-aggregate.input';
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

  @Field(() => UploadedFileOrderByRelationAggregateInput, { nullable: true })
  uploadedFiles?: UploadedFileOrderByRelationAggregateInput;

  @Field(() => RefreshTokenOrderByRelationAggregateInput, { nullable: true })
  refreshTokens?: RefreshTokenOrderByRelationAggregateInput;

  @Field(() => UserOrderByRelevanceInput, { nullable: true })
  _relevance?: UserOrderByRelevanceInput;
}
