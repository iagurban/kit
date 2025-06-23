import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutOwnProjectInput } from './user-create-or-connect-without-own-project.input';
import { UserCreateWithoutOwnProjectInput } from './user-create-without-own-project.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutOwnProjectInput {
  @Field(() => UserCreateWithoutOwnProjectInput, { nullable: true })
  @Type(() => UserCreateWithoutOwnProjectInput)
  create?: UserCreateWithoutOwnProjectInput;

  @Field(() => UserCreateOrConnectWithoutOwnProjectInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutOwnProjectInput)
  connectOrCreate?: UserCreateOrConnectWithoutOwnProjectInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;
}
