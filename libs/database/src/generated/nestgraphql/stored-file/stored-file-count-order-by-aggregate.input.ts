import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class StoredFileCountOrderByAggregateInput {
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

  @Field(() => SortOrder, { nullable: true })
  metadata?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  uploadedByUserId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: `${SortOrder}`;
}
