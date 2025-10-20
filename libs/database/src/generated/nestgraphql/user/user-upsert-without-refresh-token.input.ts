import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutRefreshTokenInput } from './user-create-without-refresh-token.input';
import { UserUpdateWithoutRefreshTokenInput } from './user-update-without-refresh-token.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutRefreshTokenInput {
  @Field(() => UserUpdateWithoutRefreshTokenInput, { nullable: false })
  @Type(() => UserUpdateWithoutRefreshTokenInput)
  update!: UserUpdateWithoutRefreshTokenInput;

  @Field(() => UserCreateWithoutRefreshTokenInput, { nullable: false })
  @Type(() => UserCreateWithoutRefreshTokenInput)
  create!: UserCreateWithoutRefreshTokenInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
