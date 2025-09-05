import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RefreshTokenCreateInput } from './refresh-token-create.input';

@ArgsType()
export class CreateOneRefreshTokenArgs {
  @Field(() => RefreshTokenCreateInput, { nullable: false })
  @Type(() => RefreshTokenCreateInput)
  data!: RefreshTokenCreateInput;
}
