import { Field, ObjectType } from '@nestjs/graphql';

import { RefreshTokenCountAggregate } from './refresh-token-count-aggregate.output';
import { RefreshTokenMaxAggregate } from './refresh-token-max-aggregate.output';
import { RefreshTokenMinAggregate } from './refresh-token-min-aggregate.output';

@ObjectType()
export class AggregateRefreshToken {
  @Field(() => RefreshTokenCountAggregate, { nullable: true })
  _count?: RefreshTokenCountAggregate;

  @Field(() => RefreshTokenMinAggregate, { nullable: true })
  _min?: RefreshTokenMinAggregate;

  @Field(() => RefreshTokenMaxAggregate, { nullable: true })
  _max?: RefreshTokenMaxAggregate;
}
