import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { RefreshTokenCountAggregateInput } from './refresh-token-count-aggregate.input';
import { RefreshTokenMaxAggregateInput } from './refresh-token-max-aggregate.input';
import { RefreshTokenMinAggregateInput } from './refresh-token-min-aggregate.input';
import { RefreshTokenOrderByWithRelationInput } from './refresh-token-order-by-with-relation.input';
import { RefreshTokenWhereInput } from './refresh-token-where.input';
import { RefreshTokenWhereUniqueInput } from './refresh-token-where-unique.input';

@ArgsType()
export class RefreshTokenAggregateArgs {
  @Field(() => RefreshTokenWhereInput, { nullable: true })
  @Type(() => RefreshTokenWhereInput)
  where?: RefreshTokenWhereInput;

  @Field(() => [RefreshTokenOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<RefreshTokenOrderByWithRelationInput>;

  @Field(() => RefreshTokenWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => RefreshTokenCountAggregateInput, { nullable: true })
  _count?: RefreshTokenCountAggregateInput;

  @Field(() => RefreshTokenMinAggregateInput, { nullable: true })
  _min?: RefreshTokenMinAggregateInput;

  @Field(() => RefreshTokenMaxAggregateInput, { nullable: true })
  _max?: RefreshTokenMaxAggregateInput;
}
