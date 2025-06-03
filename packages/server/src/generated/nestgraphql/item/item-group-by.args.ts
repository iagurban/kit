import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemAvgAggregateInput } from './item-avg-aggregate.input';
import { ItemCountAggregateInput } from './item-count-aggregate.input';
import { ItemMaxAggregateInput } from './item-max-aggregate.input';
import { ItemMinAggregateInput } from './item-min-aggregate.input';
import { ItemOrderByWithAggregationInput } from './item-order-by-with-aggregation.input';
import { ItemScalarFieldEnum } from './item-scalar-field.enum';
import { ItemScalarWhereWithAggregatesInput } from './item-scalar-where-with-aggregates.input';
import { ItemSumAggregateInput } from './item-sum-aggregate.input';
import { ItemWhereInput } from './item-where.input';

@ArgsType()
export class ItemGroupByArgs {
  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  where?: ItemWhereInput;

  @Field(() => [ItemOrderByWithAggregationInput], { nullable: true })
  @Type(() => ItemOrderByWithAggregationInput)
  orderBy?: Array<ItemOrderByWithAggregationInput>;

  @Field(() => [ItemScalarFieldEnum], { nullable: false })
  by!: Array<`${ItemScalarFieldEnum}`>;

  @Field(() => ItemScalarWhereWithAggregatesInput, { nullable: true })
  @Type(() => ItemScalarWhereWithAggregatesInput)
  having?: ItemScalarWhereWithAggregatesInput;

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
