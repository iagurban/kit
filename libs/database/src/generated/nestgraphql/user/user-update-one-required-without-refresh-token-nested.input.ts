import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserCreateOrConnectWithoutRefreshTokenInput } from './user-create-or-connect-without-refresh-token.input';
import { UserCreateWithoutRefreshTokenInput } from './user-create-without-refresh-token.input';
import { UserUpdateToOneWithWhereWithoutRefreshTokenInput } from './user-update-to-one-with-where-without-refresh-token.input';
import { UserUpsertWithoutRefreshTokenInput } from './user-upsert-without-refresh-token.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutRefreshTokenNestedInput {
  @Field(() => UserCreateWithoutRefreshTokenInput, { nullable: true })
  @Type(() => UserCreateWithoutRefreshTokenInput)
  create?: UserCreateWithoutRefreshTokenInput;

  @Field(() => UserCreateOrConnectWithoutRefreshTokenInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutRefreshTokenInput)
  connectOrCreate?: UserCreateOrConnectWithoutRefreshTokenInput;

  @Field(() => UserUpsertWithoutRefreshTokenInput, { nullable: true })
  @Type(() => UserUpsertWithoutRefreshTokenInput)
  upsert?: UserUpsertWithoutRefreshTokenInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserUpdateToOneWithWhereWithoutRefreshTokenInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutRefreshTokenInput)
  update?: UserUpdateToOneWithWhereWithoutRefreshTokenInput;
}
