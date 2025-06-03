import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemOrderByRelationAggregateInput } from '../item/item-order-by-relation-aggregate.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { TagOrderByRelationAggregateInput } from '../tag/tag-order-by-relation-aggregate.input';
import { UploadedFileOrderByRelationAggregateInput } from '../uploaded-file/uploaded-file-order-by-relation-aggregate.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';

@InputType()
export class MenuOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  title?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  ownerId?: `${SortOrder}`;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  owner?: UserOrderByWithRelationInput;

  @Field(() => ItemOrderByRelationAggregateInput, { nullable: true })
  @Type(() => ItemOrderByRelationAggregateInput)
  items?: ItemOrderByRelationAggregateInput;

  @Field(() => TagOrderByRelationAggregateInput, { nullable: true })
  tags?: TagOrderByRelationAggregateInput;

  @Field(() => UploadedFileOrderByRelationAggregateInput, { nullable: true })
  @Type(() => UploadedFileOrderByRelationAggregateInput)
  files?: UploadedFileOrderByRelationAggregateInput;
}
