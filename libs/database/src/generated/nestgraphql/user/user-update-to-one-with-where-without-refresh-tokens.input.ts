import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutRefreshTokensInput } from './user-update-without-refresh-tokens.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutRefreshTokensInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutRefreshTokensInput, { nullable: false })
  @Type(() => UserUpdateWithoutRefreshTokensInput)
  data!: UserUpdateWithoutRefreshTokensInput;
}
