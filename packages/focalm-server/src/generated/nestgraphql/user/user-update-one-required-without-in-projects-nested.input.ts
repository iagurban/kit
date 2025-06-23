import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutInProjectsInput } from './user-create-or-connect-without-in-projects.input';
import { UserCreateWithoutInProjectsInput } from './user-create-without-in-projects.input';
import { UserUpdateToOneWithWhereWithoutInProjectsInput } from './user-update-to-one-with-where-without-in-projects.input';
import { UserUpsertWithoutInProjectsInput } from './user-upsert-without-in-projects.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutInProjectsNestedInput {
  @Field(() => UserCreateWithoutInProjectsInput, { nullable: true })
  @Type(() => UserCreateWithoutInProjectsInput)
  create?: UserCreateWithoutInProjectsInput;

  @Field(() => UserCreateOrConnectWithoutInProjectsInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutInProjectsInput)
  connectOrCreate?: UserCreateOrConnectWithoutInProjectsInput;

  @Field(() => UserUpsertWithoutInProjectsInput, { nullable: true })
  @Type(() => UserUpsertWithoutInProjectsInput)
  upsert?: UserUpsertWithoutInProjectsInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;

  @Field(() => UserUpdateToOneWithWhereWithoutInProjectsInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutInProjectsInput)
  update?: UserUpdateToOneWithWhereWithoutInProjectsInput;
}
