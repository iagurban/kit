import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { RefreshTokenCreateManyUserInput } from './refresh-token-create-many-user.input';

@InputType()
export class RefreshTokenCreateManyUserInputEnvelope {
  @Field(() => [RefreshTokenCreateManyUserInput], { nullable: false })
  @Type(() => RefreshTokenCreateManyUserInput)
  data!: Array<RefreshTokenCreateManyUserInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
