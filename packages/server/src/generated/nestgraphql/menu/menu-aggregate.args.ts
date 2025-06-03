import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuCountAggregateInput } from './menu-count-aggregate.input';
import { MenuMaxAggregateInput } from './menu-max-aggregate.input';
import { MenuMinAggregateInput } from './menu-min-aggregate.input';
import { MenuOrderByWithRelationInput } from './menu-order-by-with-relation.input';
import { MenuWhereInput } from './menu-where.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@ArgsType()
export class MenuAggregateArgs {
  @Field(() => MenuWhereInput, { nullable: true })
  @Type(() => MenuWhereInput)
  where?: MenuWhereInput;

  @Field(() => [MenuOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<MenuOrderByWithRelationInput>;

  @Field(() => MenuWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => MenuCountAggregateInput, { nullable: true })
  _count?: MenuCountAggregateInput;

  @Field(() => MenuMinAggregateInput, { nullable: true })
  _min?: MenuMinAggregateInput;

  @Field(() => MenuMaxAggregateInput, { nullable: true })
  _max?: MenuMaxAggregateInput;
}
