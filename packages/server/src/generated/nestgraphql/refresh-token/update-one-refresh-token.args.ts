import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { RefreshTokenUpdateInput } from './refresh-token-update.input';
import { RefreshTokenWhereUniqueInput } from './refresh-token-where-unique.input';

@ArgsType()
export class UpdateOneRefreshTokenArgs {
  @Field(() => RefreshTokenUpdateInput, { nullable: false })
  @Type(() => RefreshTokenUpdateInput)
  data!: RefreshTokenUpdateInput;

  @Field(() => RefreshTokenWhereUniqueInput, { nullable: false })
  @Type(() => RefreshTokenWhereUniqueInput)
  where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id'>;
}
