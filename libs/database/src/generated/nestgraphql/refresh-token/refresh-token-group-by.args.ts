import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RefreshTokenCountAggregateInput } from './refresh-token-count-aggregate.input';
import { RefreshTokenMaxAggregateInput } from './refresh-token-max-aggregate.input';
import { RefreshTokenMinAggregateInput } from './refresh-token-min-aggregate.input';
import { RefreshTokenOrderByWithAggregationInput } from './refresh-token-order-by-with-aggregation.input';
import { RefreshTokenScalarFieldEnum } from './refresh-token-scalar-field.enum';
import { RefreshTokenScalarWhereWithAggregatesInput } from './refresh-token-scalar-where-with-aggregates.input';
import { RefreshTokenWhereInput } from './refresh-token-where.input';

@ArgsType()
export class RefreshTokenGroupByArgs {
  @Field(() => RefreshTokenWhereInput, { nullable: true })
  @Type(() => RefreshTokenWhereInput)
  where?: RefreshTokenWhereInput;

  @Field(() => [RefreshTokenOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<RefreshTokenOrderByWithAggregationInput>;

  @Field(() => [RefreshTokenScalarFieldEnum], { nullable: false })
  by!: Array<`${RefreshTokenScalarFieldEnum}`>;

  @Field(() => RefreshTokenScalarWhereWithAggregatesInput, { nullable: true })
  having?: RefreshTokenScalarWhereWithAggregatesInput;

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
