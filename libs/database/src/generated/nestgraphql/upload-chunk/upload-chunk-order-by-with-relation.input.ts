import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UploadSessionOrderByWithRelationInput } from '../upload-session/upload-session-order-by-with-relation.input';
import { UploadChunkOrderByRelevanceInput } from './upload-chunk-order-by-relevance.input';

@InputType()
export class UploadChunkOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  sessionId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  partNumber?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  eTag?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  leasedAt?: SortOrderInput;

  @Field(() => UploadSessionOrderByWithRelationInput, { nullable: true })
  session?: UploadSessionOrderByWithRelationInput;

  @Field(() => UploadChunkOrderByRelevanceInput, { nullable: true })
  _relevance?: UploadChunkOrderByRelevanceInput;
}
