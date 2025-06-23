import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateWithoutOwnProjectInput } from './user-create-without-own-project.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutOwnProjectInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;

  @Field(() => UserCreateWithoutOwnProjectInput, { nullable: false })
  @Type(() => UserCreateWithoutOwnProjectInput)
  create!: UserCreateWithoutOwnProjectInput;
}
