import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { StoredFileOrderByWithRelationInput } from '../stored-file/stored-file-order-by-with-relation.input';
import { UploadChunkOrderByRelationAggregateInput } from '../upload-chunk/upload-chunk-order-by-relation-aggregate.input';
import { UploadSessionOrderByRelevanceInput } from './upload-session-order-by-relevance.input';

@InputType()
export class UploadSessionOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  storageUploadId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  fileId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  totalChunks?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  status?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  failReason?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  totalFailureCount?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => StoredFileOrderByWithRelationInput, { nullable: true })
  file?: StoredFileOrderByWithRelationInput;

  @Field(() => UploadChunkOrderByRelationAggregateInput, { nullable: true })
  chunks?: UploadChunkOrderByRelationAggregateInput;

  @Field(() => UploadSessionOrderByRelevanceInput, { nullable: true })
  _relevance?: UploadSessionOrderByRelevanceInput;
}
