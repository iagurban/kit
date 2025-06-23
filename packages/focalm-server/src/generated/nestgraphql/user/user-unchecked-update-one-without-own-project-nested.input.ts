import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutOwnProjectInput } from './user-create-or-connect-without-own-project.input';
import { UserCreateWithoutOwnProjectInput } from './user-create-without-own-project.input';
import { UserUpdateToOneWithWhereWithoutOwnProjectInput } from './user-update-to-one-with-where-without-own-project.input';
import { UserUpsertWithoutOwnProjectInput } from './user-upsert-without-own-project.input';
import { UserWhereInput } from './user-where.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUncheckedUpdateOneWithoutOwnProjectNestedInput {
  @Field(() => UserCreateWithoutOwnProjectInput, { nullable: true })
  @Type(() => UserCreateWithoutOwnProjectInput)
  create?: UserCreateWithoutOwnProjectInput;

  @Field(() => UserCreateOrConnectWithoutOwnProjectInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutOwnProjectInput)
  connectOrCreate?: UserCreateOrConnectWithoutOwnProjectInput;

  @Field(() => UserUpsertWithoutOwnProjectInput, { nullable: true })
  @Type(() => UserUpsertWithoutOwnProjectInput)
  upsert?: UserUpsertWithoutOwnProjectInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  disconnect?: UserWhereInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  delete?: UserWhereInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;

  @Field(() => UserUpdateToOneWithWhereWithoutOwnProjectInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutOwnProjectInput)
  update?: UserUpdateToOneWithWhereWithoutOwnProjectInput;
}
