import { Field, InputType } from '@nestjs/graphql';

import { Prisma } from '../../db-client';
import Decimal = Prisma.Decimal;
import { Transform, Type } from 'class-transformer';
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal';

import { NestedDecimalNullableFilter } from './nested-decimal-nullable-filter.input';
import { NestedIntNullableFilter } from './nested-int-nullable-filter.input';

@InputType()
export class NestedDecimalNullableWithAggregatesFilter {
  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  equals?: Decimal;

  @Field(() => [GraphQLDecimal], { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  in?: Array<Decimal>;

  @Field(() => [GraphQLDecimal], { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  notIn?: Array<Decimal>;

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  lt?: Decimal;

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  lte?: Decimal;

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  gt?: Decimal;

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  gte?: Decimal;

  @Field(() => NestedDecimalNullableWithAggregatesFilter, { nullable: true })
  not?: NestedDecimalNullableWithAggregatesFilter;

  @Field(() => NestedIntNullableFilter, { nullable: true })
  _count?: NestedIntNullableFilter;

  @Field(() => NestedDecimalNullableFilter, { nullable: true })
  _avg?: NestedDecimalNullableFilter;

  @Field(() => NestedDecimalNullableFilter, { nullable: true })
  _sum?: NestedDecimalNullableFilter;

  @Field(() => NestedDecimalNullableFilter, { nullable: true })
  _min?: NestedDecimalNullableFilter;

  @Field(() => NestedDecimalNullableFilter, { nullable: true })
  _max?: NestedDecimalNullableFilter;
}
