import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RefreshTokenCreateManyInput } from './refresh-token-create-many.input';

@ArgsType()
export class CreateManyRefreshTokenArgs {
  @Field(() => [RefreshTokenCreateManyInput], { nullable: false })
  @Type(() => RefreshTokenCreateManyInput)
  data!: Array<RefreshTokenCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
