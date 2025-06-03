import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemAvgAggregateInput } from './item-avg-aggregate.input';
import { ItemCountAggregateInput } from './item-count-aggregate.input';
import { ItemMaxAggregateInput } from './item-max-aggregate.input';
import { ItemMinAggregateInput } from './item-min-aggregate.input';
import { ItemOrderByWithRelationInput } from './item-order-by-with-relation.input';
import { ItemSumAggregateInput } from './item-sum-aggregate.input';
import { ItemWhereInput } from './item-where.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@ArgsType()
export class ItemAggregateArgs {
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

  @Field(() => ItemCountAggregateInput, { nullable: true })
  @Type(() => ItemCountAggregateInput)
  _count?: ItemCountAggregateInput;

  @Field(() => ItemAvgAggregateInput, { nullable: true })
  @Type(() => ItemAvgAggregateInput)
  _avg?: ItemAvgAggregateInput;

  @Field(() => ItemSumAggregateInput, { nullable: true })
  @Type(() => ItemSumAggregateInput)
  _sum?: ItemSumAggregateInput;

  @Field(() => ItemMinAggregateInput, { nullable: true })
  @Type(() => ItemMinAggregateInput)
  _min?: ItemMinAggregateInput;

  @Field(() => ItemMaxAggregateInput, { nullable: true })
  @Type(() => ItemMaxAggregateInput)
  _max?: ItemMaxAggregateInput;
}
