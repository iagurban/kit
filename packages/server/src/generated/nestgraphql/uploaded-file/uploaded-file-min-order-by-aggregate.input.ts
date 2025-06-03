import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UploadedFileMinOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  originalName?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  mimetype?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  uploadedAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  uploaderId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  storedFileId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  menuId?: `${SortOrder}`;
}
