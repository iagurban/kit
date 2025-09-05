import { Field, ObjectType } from '@nestjs/graphql';

import { RefreshTokenCountAggregate } from './refresh-token-count-aggregate.output';
import { RefreshTokenMaxAggregate } from './refresh-token-max-aggregate.output';
import { RefreshTokenMinAggregate } from './refresh-token-min-aggregate.output';

@ObjectType()
export class RefreshTokenGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => Date, { nullable: false })
  expiresAt!: Date | string;

  @Field(() => String, { nullable: false })
  hash!: string;

  @Field(() => RefreshTokenCountAggregate, { nullable: true })
  _count?: RefreshTokenCountAggregate;

  @Field(() => RefreshTokenMinAggregate, { nullable: true })
  _min?: RefreshTokenMinAggregate;

  @Field(() => RefreshTokenMaxAggregate, { nullable: true })
  _max?: RefreshTokenMaxAggregate;
}
