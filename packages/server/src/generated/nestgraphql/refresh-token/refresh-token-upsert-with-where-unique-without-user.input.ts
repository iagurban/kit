import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { RefreshTokenCreateWithoutUserInput } from './refresh-token-create-without-user.input';
import { RefreshTokenUpdateWithoutUserInput } from './refresh-token-update-without-user.input';
import { RefreshTokenWhereUniqueInput } from './refresh-token-where-unique.input';

@InputType()
export class RefreshTokenUpsertWithWhereUniqueWithoutUserInput {
  @Field(() => RefreshTokenWhereUniqueInput, { nullable: false })
  @Type(() => RefreshTokenWhereUniqueInput)
  where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id'>;

  @Field(() => RefreshTokenUpdateWithoutUserInput, { nullable: false })
  @Type(() => RefreshTokenUpdateWithoutUserInput)
  update!: RefreshTokenUpdateWithoutUserInput;

  @Field(() => RefreshTokenCreateWithoutUserInput, { nullable: false })
  @Type(() => RefreshTokenCreateWithoutUserInput)
  create!: RefreshTokenCreateWithoutUserInput;
}
