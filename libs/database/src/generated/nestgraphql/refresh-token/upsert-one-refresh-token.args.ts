import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { RefreshTokenCreateInput } from './refresh-token-create.input';
import { RefreshTokenUpdateInput } from './refresh-token-update.input';
import { RefreshTokenWhereUniqueInput } from './refresh-token-where-unique.input';

@ArgsType()
export class UpsertOneRefreshTokenArgs {
  @Field(() => RefreshTokenWhereUniqueInput, { nullable: false })
  @Type(() => RefreshTokenWhereUniqueInput)
  where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id'>;

  @Field(() => RefreshTokenCreateInput, { nullable: false })
  @Type(() => RefreshTokenCreateInput)
  create!: RefreshTokenCreateInput;

  @Field(() => RefreshTokenUpdateInput, { nullable: false })
  @Type(() => RefreshTokenUpdateInput)
  update!: RefreshTokenUpdateInput;
}
