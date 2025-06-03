import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RefreshTokenUpdateManyMutationInput } from './refresh-token-update-many-mutation.input';
import { RefreshTokenWhereInput } from './refresh-token-where.input';

@ArgsType()
export class UpdateManyRefreshTokenArgs {
  @Field(() => RefreshTokenUpdateManyMutationInput, { nullable: false })
  @Type(() => RefreshTokenUpdateManyMutationInput)
  data!: RefreshTokenUpdateManyMutationInput;

  @Field(() => RefreshTokenWhereInput, { nullable: true })
  @Type(() => RefreshTokenWhereInput)
  where?: RefreshTokenWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
