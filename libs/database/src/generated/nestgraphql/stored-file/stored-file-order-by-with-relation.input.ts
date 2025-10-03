import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UploadSessionOrderByWithRelationInput } from '../upload-session/upload-session-order-by-with-relation.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { StoredFileOrderByRelevanceInput } from './stored-file-order-by-relevance.input';

@InputType()
export class StoredFileOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  checksum?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  sizeBytes?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  originalFilename?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  mimeType?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  storageKey?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  cdnUrl?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  metadata?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  uploadedByUserId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: `${SortOrder}`;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  uploadedByUser?: UserOrderByWithRelationInput;

  @Field(() => UploadSessionOrderByWithRelationInput, { nullable: true })
  uploadSession?: UploadSessionOrderByWithRelationInput;

  @Field(() => StoredFileOrderByRelevanceInput, { nullable: true })
  _relevance?: StoredFileOrderByRelevanceInput;
}
