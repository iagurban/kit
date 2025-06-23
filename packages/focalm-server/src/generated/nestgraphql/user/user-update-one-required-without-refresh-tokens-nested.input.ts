import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutRefreshTokensInput } from './user-create-or-connect-without-refresh-tokens.input';
import { UserCreateWithoutRefreshTokensInput } from './user-create-without-refresh-tokens.input';
import { UserUpdateToOneWithWhereWithoutRefreshTokensInput } from './user-update-to-one-with-where-without-refresh-tokens.input';
import { UserUpsertWithoutRefreshTokensInput } from './user-upsert-without-refresh-tokens.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutRefreshTokensNestedInput {
  @Field(() => UserCreateWithoutRefreshTokensInput, { nullable: true })
  @Type(() => UserCreateWithoutRefreshTokensInput)
  create?: UserCreateWithoutRefreshTokensInput;

  @Field(() => UserCreateOrConnectWithoutRefreshTokensInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutRefreshTokensInput)
  connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput;

  @Field(() => UserUpsertWithoutRefreshTokensInput, { nullable: true })
  @Type(() => UserUpsertWithoutRefreshTokensInput)
  upsert?: UserUpsertWithoutRefreshTokensInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;

  @Field(() => UserUpdateToOneWithWhereWithoutRefreshTokensInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutRefreshTokensInput)
  update?: UserUpdateToOneWithWhereWithoutRefreshTokensInput;
}
