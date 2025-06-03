import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { SortOrder } from '../prisma/sort-order.enum';
import { UploadedFileOrderByRelationAggregateInput } from '../uploaded-file/uploaded-file-order-by-relation-aggregate.input';

@InputType()
export class StoredFileOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  hash?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  size?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => UploadedFileOrderByRelationAggregateInput, { nullable: true })
  @Type(() => UploadedFileOrderByRelationAggregateInput)
  uploads?: UploadedFileOrderByRelationAggregateInput;
}
