import { Field, ObjectType } from '@nestjs/graphql';

import { Prisma } from '../../db-client';
import Decimal = Prisma.Decimal;
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

import { ItemAvgAggregate } from './item-avg-aggregate.output';
import { ItemCountAggregate } from './item-count-aggregate.output';
import { ItemMaxAggregate } from './item-max-aggregate.output';
import { ItemMinAggregate } from './item-min-aggregate.output';
import { ItemSumAggregate } from './item-sum-aggregate.output';

@ObjectType()
export class ItemGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => String, { nullable: false })
  orderKey!: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLDecimal, { nullable: true })
  price?: Decimal;

  @Field(() => Boolean, { nullable: false })
  archived!: boolean;

  @Field(() => String, { nullable: true })
  imageId?: string;

  @Field(() => String, { nullable: false })
  menuId!: string;

  @Field(() => String, { nullable: true })
  parentId?: string;

  @Field(() => ItemCountAggregate, { nullable: true })
  _count?: ItemCountAggregate;

  @Field(() => ItemAvgAggregate, { nullable: true })
  _avg?: ItemAvgAggregate;

  @Field(() => ItemSumAggregate, { nullable: true })
  _sum?: ItemSumAggregate;

  @Field(() => ItemMinAggregate, { nullable: true })
  _min?: ItemMinAggregate;

  @Field(() => ItemMaxAggregate, { nullable: true })
  _max?: ItemMaxAggregate;
}
