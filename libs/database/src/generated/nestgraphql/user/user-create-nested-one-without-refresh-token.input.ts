import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserCreateOrConnectWithoutRefreshTokenInput } from './user-create-or-connect-without-refresh-token.input';
import { UserCreateWithoutRefreshTokenInput } from './user-create-without-refresh-token.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutRefreshTokenInput {
  @Field(() => UserCreateWithoutRefreshTokenInput, { nullable: true })
  @Type(() => UserCreateWithoutRefreshTokenInput)
  create?: UserCreateWithoutRefreshTokenInput;

  @Field(() => UserCreateOrConnectWithoutRefreshTokenInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutRefreshTokenInput)
  connectOrCreate?: UserCreateOrConnectWithoutRefreshTokenInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;
}
