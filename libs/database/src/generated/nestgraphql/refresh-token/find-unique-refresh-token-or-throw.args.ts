import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { RefreshTokenWhereUniqueInput } from './refresh-token-where-unique.input';

@ArgsType()
export class FindUniqueRefreshTokenOrThrowArgs {
  @Field(() => RefreshTokenWhereUniqueInput, { nullable: false })
  @Type(() => RefreshTokenWhereUniqueInput)
  where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id'>;
}
