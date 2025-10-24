import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { RefreshTokenCreateWithoutUserInput } from './refresh-token-create-without-user.input';
import { RefreshTokenWhereUniqueInput } from './refresh-token-where-unique.input';

@InputType()
export class RefreshTokenCreateOrConnectWithoutUserInput {
  @Field(() => RefreshTokenWhereUniqueInput, { nullable: false })
  @Type(() => RefreshTokenWhereUniqueInput)
  where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id'>;

  @Field(() => RefreshTokenCreateWithoutUserInput, { nullable: false })
  @Type(() => RefreshTokenCreateWithoutUserInput)
  create!: RefreshTokenCreateWithoutUserInput;
}
