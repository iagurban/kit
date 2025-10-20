import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutRefreshTokenInput } from './user-update-without-refresh-token.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutRefreshTokenInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutRefreshTokenInput, { nullable: false })
  @Type(() => UserUpdateWithoutRefreshTokenInput)
  data!: UserUpdateWithoutRefreshTokenInput;
}
