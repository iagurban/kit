import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuOrderByWithRelationInput } from '../menu/menu-order-by-with-relation.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UploadedFileOrderByWithRelationInput } from '../uploaded-file/uploaded-file-order-by-with-relation.input';
import { ItemOrderByRelationAggregateInput } from './item-order-by-relation-aggregate.input';

@InputType()
export class ItemOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  orderKey?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  title?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  description?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  @Type(() => SortOrderInput)
  price?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  archived?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  imageId?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  menuId?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  parentId?: SortOrderInput;

  @Field(() => UploadedFileOrderByWithRelationInput, { nullable: true })
  @Type(() => UploadedFileOrderByWithRelationInput)
  image?: UploadedFileOrderByWithRelationInput;

  @Field(() => MenuOrderByWithRelationInput, { nullable: true })
  @Type(() => MenuOrderByWithRelationInput)
  menu?: MenuOrderByWithRelationInput;

  @Field(() => ItemOrderByWithRelationInput, { nullable: true })
  @Type(() => ItemOrderByWithRelationInput)
  parent?: ItemOrderByWithRelationInput;

  @Field(() => ItemOrderByRelationAggregateInput, { nullable: true })
  @Type(() => ItemOrderByRelationAggregateInput)
  children?: ItemOrderByRelationAggregateInput;
}
