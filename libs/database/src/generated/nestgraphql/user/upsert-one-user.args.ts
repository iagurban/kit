import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserCreateInput } from './user-create.input';
import { UserUpdateInput } from './user-update.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@ArgsType()
export class UpsertOneUserArgs {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserCreateInput, { nullable: false })
  @Type(() => UserCreateInput)
  create!: UserCreateInput;

  @Field(() => UserUpdateInput, { nullable: false })
  @Type(() => UserUpdateInput)
  update!: UserUpdateInput;
}
