import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { RefreshTokenUpdateWithoutUserInput } from './refresh-token-update-without-user.input';
import { RefreshTokenWhereUniqueInput } from './refresh-token-where-unique.input';

@InputType()
export class RefreshTokenUpdateWithWhereUniqueWithoutUserInput {
  @Field(() => RefreshTokenWhereUniqueInput, { nullable: false })
  @Type(() => RefreshTokenWhereUniqueInput)
  where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id'>;

  @Field(() => RefreshTokenUpdateWithoutUserInput, { nullable: false })
  @Type(() => RefreshTokenUpdateWithoutUserInput)
  data!: RefreshTokenUpdateWithoutUserInput;
}
