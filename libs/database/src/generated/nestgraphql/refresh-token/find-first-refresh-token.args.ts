import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { RefreshTokenOrderByWithRelationInput } from './refresh-token-order-by-with-relation.input';
import { RefreshTokenScalarFieldEnum } from './refresh-token-scalar-field.enum';
import { RefreshTokenWhereInput } from './refresh-token-where.input';
import { RefreshTokenWhereUniqueInput } from './refresh-token-where-unique.input';

@ArgsType()
export class FindFirstRefreshTokenArgs {
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

  @Field(() => [RefreshTokenScalarFieldEnum], { nullable: true })
  distinct?: Array<`${RefreshTokenScalarFieldEnum}`>;
}
