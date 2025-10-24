import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserUpdateInput } from './user-update.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@ArgsType()
export class UpdateOneUserArgs {
  @Field(() => UserUpdateInput, { nullable: false })
  @Type(() => UserUpdateInput)
  data!: UserUpdateInput;

  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;
}
