import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { StoredFileOrderByWithRelationInput } from '../stored-file/stored-file-order-by-with-relation.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';

@InputType()
export class UploadedFileOrderByWithRelationInput {
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

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  uploader?: UserOrderByWithRelationInput;

  @Field(() => StoredFileOrderByWithRelationInput, { nullable: true })
  storedFile?: StoredFileOrderByWithRelationInput;
}
