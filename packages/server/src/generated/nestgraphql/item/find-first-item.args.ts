import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemOrderByWithRelationInput } from './item-order-by-with-relation.input';
import { ItemScalarFieldEnum } from './item-scalar-field.enum';
import { ItemWhereInput } from './item-where.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@ArgsType()
export class FindFirstItemArgs {
  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  where?: ItemWhereInput;

  @Field(() => [ItemOrderByWithRelationInput], { nullable: true })
  @Type(() => ItemOrderByWithRelationInput)
  orderBy?: Array<ItemOrderByWithRelationInput>;

  @Field(() => ItemWhereUniqueInput, { nullable: true })
  @Type(() => ItemWhereUniqueInput)
  cursor?: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ItemScalarFieldEnum], { nullable: true })
  distinct?: Array<`${ItemScalarFieldEnum}`>;
}
