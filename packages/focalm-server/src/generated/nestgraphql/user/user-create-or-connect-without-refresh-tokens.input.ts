import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateWithoutRefreshTokensInput } from './user-create-without-refresh-tokens.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutRefreshTokensInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;

  @Field(() => UserCreateWithoutRefreshTokensInput, { nullable: false })
  @Type(() => UserCreateWithoutRefreshTokensInput)
  create!: UserCreateWithoutRefreshTokensInput;
}
