import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserCreateWithoutRefreshTokenInput } from './user-create-without-refresh-token.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutRefreshTokenInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserCreateWithoutRefreshTokenInput, { nullable: false })
  @Type(() => UserCreateWithoutRefreshTokenInput)
  create!: UserCreateWithoutRefreshTokenInput;
}
