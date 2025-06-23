import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagCreateManyRoleInputEnvelope } from './user-in-task-tag-create-many-role-input-envelope.input';
import { UserInTaskTagCreateOrConnectWithoutRoleInput } from './user-in-task-tag-create-or-connect-without-role.input';
import { UserInTaskTagCreateWithoutRoleInput } from './user-in-task-tag-create-without-role.input';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@InputType()
export class UserInTaskTagCreateNestedManyWithoutRoleInput {
  @Field(() => [UserInTaskTagCreateWithoutRoleInput], { nullable: true })
  @Type(() => UserInTaskTagCreateWithoutRoleInput)
  create?: Array<UserInTaskTagCreateWithoutRoleInput>;

  @Field(() => [UserInTaskTagCreateOrConnectWithoutRoleInput], { nullable: true })
  @Type(() => UserInTaskTagCreateOrConnectWithoutRoleInput)
  connectOrCreate?: Array<UserInTaskTagCreateOrConnectWithoutRoleInput>;

  @Field(() => UserInTaskTagCreateManyRoleInputEnvelope, { nullable: true })
  @Type(() => UserInTaskTagCreateManyRoleInputEnvelope)
  createMany?: UserInTaskTagCreateManyRoleInputEnvelope;

  @Field(() => [UserInTaskTagWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskTagWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_roleId'>>;
}
